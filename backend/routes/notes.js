const express = require('express')
const fetchuser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note')
const router = express.Router()

// ROUTE 1: get all the notes, using "GET" /api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({
            user: req.user.id
        })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('internal server error')
    }
})

// ROUTE 2: add new notes, using "POST" /api/notes/addnote". login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title min 3 characters').isLength({ min: 3 }),
    body('description', 'description length min 5').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body
        // if there are errors, return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // if no error, new Note will return a promise
        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id,
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('internal server error')
    }
})

// ROUTE 3: update an existing note, using "PUT" /api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body
        // create a new note object
        const newNote = {}
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag
        }

        // find the note to be updated and update it
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send('not found')
        }
        // checking if the same user is updating its notes
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('access denied')
        }

        // if note found and user is valid
        // new: true means if there is new content, then it will be created
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('internal server error')
    }
})

// ROUTE 4: delete an existing note, using "DELETE" /api/notes/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body
        
        // find the note to be deleted and delete it
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send('not found')
        }
        // allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('access denied')
        }

        // if note found and user is valid
        // new: true means if there is new content, then it will be created
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({
            "Success": 'note has been deleted',
            note: note
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('internal server error')
    }
})


module.exports = router