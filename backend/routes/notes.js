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

module.exports = router