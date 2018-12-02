const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post');

// POST api/posts | desc: create posts | acces: private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Input fields validation
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost
      .save()
      .then(post => res.json(post))
      .catch(e => res.json(e));
  }
);
//
module.exports = router;
