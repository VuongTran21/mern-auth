const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// load User model
const User = require('../../models/User');

router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email}).then(user => {
        if (user) {
            return res.status(400).json({email: "Email already exists"});
        }

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
    
        // hash password before saving to db
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    throw err;
                }
    
                newUser.password = hash;
                
                // save user
                newUser.save().then(user => res.json(user)).catch(err => console.log(err));
            })
        })
    });
})

router.post('/login', (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // find user by email

    User.findOne({email})
        .then(user => {
            if (!user) {
                return res.status(404).json({emailNotFound: "Email not found."});
            }

            // return res.status(200).json({password, userPassword: user.password});

            // check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    // User matched
                    // create JWT Payload
                    const payload = {
                        id: user.id,
                        name: user.name
                    };

                    // sign token
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: 10
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bear ' + token
                            })
                        }
                    )
                } else {
                    return res.status(400).json({
                        passwordIncorrect: 'Password incorrect'
                    });
                }
            })
        })
})

module.exports = router;