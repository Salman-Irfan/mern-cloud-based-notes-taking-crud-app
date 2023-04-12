const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


// create a user using" POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name min 3 characters').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password length min 5').isLength({ min: 5 })
],
    async (req, res) => {
        // if there are errors, return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // check whether the user with this email exists already
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: 'user with this email already exists' })
            }
            // create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })
            res.json({ user })
        } catch (error) {
            console.error(error.message)
            res.status(500).send('something went wrong')
        }
    })

module.exports = router