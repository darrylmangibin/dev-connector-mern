const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
// Profile mode
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

router.get('/test', (req, res) => {
  return res.json({
    msg: 'Posts Works'
  })
})

// api/posts/
// get posts
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((post => res.json(post)))
    .catch((err) => res.status(404).json({nopostsfound: 'No posts found with that ID'}))
})

// api/posts/
// get single post
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .sort({ date: -1 })
    .then((post => res.json(post)))
    .catch((err) => res.status(404).json({nopostfound: 'No post found with that ID'}))
})


// api/posts
// Create post (private)
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  // check validation
  if(!isValid) {
    return res.status(400).json(errors)
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });
  newPost.save().then((post) => res.json(post));
})

// api/posts/:id
// delete post
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if(post.user.toString() !== req.user.id) {
            return res.status(401).json({ notauthorized: 'User not authorized' })
          }
          post.remove().then(() => res.json({ success: true }))
        })
        .catch((err) => res.status(404).json({ postnotfound: 'No post found' }))
    })
})

// api/posts/like/:id
// post request
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if(post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyliked: 'User already liked this post' })
          }
          post.likes.unshift({ user: req.user.id })

          post.save().then(post => res.json(post))
        })
        .catch((err) => res.status(404).json({ postnotfound: 'No post found' }))
    })
})

// api/posts/unlike/:id
// post request
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if(post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ notliked: 'You have not yet liked this post' })
          }
          const removeIndex = post.likes.map((item) => item.user.toString()).indexOf(req.user.id);

          post.likes.splice(removeIndex, 1);

          post.save().then((post => res.json(post)))
        })
        .catch((err) => res.status(404).json({ postnotfound: 'No post found' }))
    })
})


module.exports = router;