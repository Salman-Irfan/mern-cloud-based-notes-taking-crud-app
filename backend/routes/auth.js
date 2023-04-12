const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'jwt-secret';


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
            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt)
            // create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            // response token
            const data = {
                user:{
                    id: user.id,
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET)

            res.json({authtoken: authtoken})
        } catch (error) {
            console.error(error.message)
            res.status(500).send('something went wrong')
        }
    })

module.exports = router