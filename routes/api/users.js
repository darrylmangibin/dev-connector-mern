const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User Model
const User = require('../../models/User');

router.get('/test', (req, res) => {
  return res.json({
    msg: 'Users Works'
  })
});

// User Register
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({
    email: req.body.email
  })
  .then((user) => {
    errors.email = 'Email already exists';
    if(user) {
      return res.status(400).json(errors)
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err))
        })
      })
    }
  })
});

// User Login
router.post('/login', (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email;
  const password = req.body.password;

  // find the user by email
  User.findOne({ email: email })
    .then((user) => {
      errors.email = 'User not Found'
      if(!user) {
        return res.status(404).json(errors)
      }
      
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if(isMatch) {
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            }
            // Sign Token
            jwt.sign(
              payload, 
              keys.secretOrKey, 
              { expiresIn: 604800 }, 
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
            })

            // res.json({ msg: 'Success' })
          } else {
            errors.password = 'Password incorrect'
            return res.status(400).json(errors);
          }
        });
    });
});

// Return current User (Private)
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})

module.exports = router;