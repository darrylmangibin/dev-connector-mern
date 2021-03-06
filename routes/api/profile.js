const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Profile
const User = require('../../models/User');

router.get('/test', (req, res) => {
  return res.json({
    msg: 'Profile Works'
  })
})

// get all profiles
// api/profile/all
router.get('/all', (req, res) => {
 const errors = {};
 Profile.find()
  .populate('user', ['name', 'avatar'])
  .then((profiles) => {
    if(!profiles) {
      errors.noprofile = 'There are no profiles';
      return res.status(404).json(errors);
    }
    res.json(profiles)
  })
  .catch((err) => 
    res.status(404).json({profile: 'There are no profiles'})
  )
})

// Get current users profile
// api/profile
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {}
  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch((err) => 
      res.status(404).json(err)
    )
});

// GET profile by handle
// api/profile/user/user_id
router.get('/user/:user_id', (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch((err) => res.status(404).json({profile: 'There is no profile for this user'}))
});

// GET profile by username
// api/profile/handle/handlename
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  Profile.findOne({
      handle: req.params.handle
    })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch((err) => res.status(404).json(err))
})

// Post/Create/Edit User Profile (Private)
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body)

  // check validation
  if(!isValid) {
    return res.status(400).json(errors)
  }

  // GET fields
  const profileFields = {};
  profileFields.user = req.user.id;

  if(req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

  // SKILLS split into array
  if (typeof req.body.skills !== 'undefined')  {
    profileFields.skills = req.body.skills.split(',')
  }
  
  // Social
  profileFields.social = {};

  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      if(profile) {
        // update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        .then((profile) => res.json(profile))
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle })
          .then(profile => {
            if(profile) {
              errors.handle = 'That handle already exists';
              res.status(400).json(errors);
            }

            // save profile
            new Profile(profileFields)
              .save().then(profile => res.json(profile))
          })
      }
    })
})

// api/profile/experience
// add experience to profile
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body)

  // check validation
  if(!isValid) {
    return res.status(400).json(errors)
  }
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }
      // add to exp arr
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile))
    })
})

// api/profile/education
// add education tp profile
router.post('/education', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body)

  // check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }
  Profile.findOne({
      user: req.user.id
    })
    .then((profile) => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }
      // add to exp arr
      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile))
    })
})

// api/profile/experince
// delete experience from profile profile
router.delete('/experience/:exp_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  
  Profile.findOne({
      user: req.user.id
    })
    .then((profile) => {
      // get remove index
      const removeIndex = profile.experience.map((item) => {
        return item.id
      })
      .indexOf(req.params.exp_id);

      // splice out of array
      profile.experience.splice(removeIndex, 1);
      profile.save().then(profile => res.json(profile)).catch((err) => {
        res.status(404).json(err)
      })
    })
})

// api/profile/education
// delete education from profile profile
router.delete('/education/:edu_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  Profile.findOne({
      user: req.user.id
    })
    .then((profile) => {
      // get remove index
      const removeIndex = profile.education.map((item) => {
          return item.id
        })
        .indexOf(req.params.exp_id);

      // splice out of array
      profile.education.splice(removeIndex, 1);
      profile.save().then(profile => res.json(profile)).catch((err) => {
        res.status(404).json(err)
      })
    })
})

// api/profile
// delete user and profile
router.delete('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id })
        .then(() => {
          res.json({ success: true })
        })
    })
})

module.exports = router;