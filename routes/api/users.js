const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../../models/User');

router.get('/test', (req, res) => {
  return res.json({
    msg: 'Users Works'
  })
});

// User Register
router.post('/register', (req, res) => {
  User.findOne({
    email: req.body.email
  })
  .then((user) => {
    if(user) {
      return res.status(400).json({ email: 'Email Already Exists' })
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
  const email = req.body.email;
  const password = req.body.password;

  // find the user by email
  User.findOne({ email: email })
    .then((user) => {
      if(!user) {
        return res.status(404).json({ error: 'User not Found' })
      }
      
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if(isMatch) {
            res.json({ msg: 'Success' })
          } else {
            return res.status(400).json({ password: 'Password incorrect'});
          }
        })
    })
})

module.exports = router;