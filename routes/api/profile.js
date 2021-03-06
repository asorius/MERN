const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// GET api/profile | desc: get current profile route | acces: private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(e => res.send(404).json(e));
  }
);
//

// GET api/profile/all | desc: get all profiles route | acces: public
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(e => res.send(404).json(e));
});
//

// GET api/profile/handle/:handle | desc: get profile by handle route | acces: public
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(e => res.send(404).json(e));
});
//

// GET api/profile/user/:user_id | desc: get profile by id route | acces: public
router.get('/user/:user_id', (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(e => res.send(404).json(e));
});
//

// POST api/profile | desc: create or edit user profile | acces: private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Input fields validation
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    // Skilles needs to be split into arprofile/ay because they in coma separated string
    if (typeof req.body.skills !== 'undeprofile/ined') {
      profileFields.skills = req.body.skills.split(',');
    }
    //
    //Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    //

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //if there is profile ,so this means user is being updated
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create
        //check for handle of that name to not duplicate handles
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'that handle already exists';
            res.status(400).json(errors);
          }
          //Save new profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
    //
  }
);
//

// POST api/profile/experience | desc: add exprerience to a profile | acces: private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Input fields validation
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newExp = req.body;
        profile.experience.unshift(newExp);
        profile.save().then(profile => res.json(profile));
      })
      .catch(e => res.send(404).json(e));
  }
);
//

// POST api/profile/education | desc: add education to a profile | acces: private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Input fields validation
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newEdu = req.body;
        profile.education.unshift(newEdu);
        profile.save().then(profile => res.json(profile));
      })
      .catch(e => res.send(404).json(e));
  }
);
//

// DELETE api/profile/experience/:exp_id | desc: delete experience from a profile | acces: private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);
//
// DELETE api/profile/education/:edu_id | desc: delete education from a profile | acces: private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);
//
//DELETE api/profile | desc: delete profile | acces: private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);
//
module.exports = router;
