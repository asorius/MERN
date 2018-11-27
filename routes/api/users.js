const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const keys = require('../../config/keys');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// GET api/users/test | desc: tests users route | acces: public
router.get('/test', (req, res) => {
  res.json({ msg: 'Users Works' });
});
//

// GET api/users/register | desc: register user route | acces: public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      bcrypt.genSalt(10, (e, salt) => {
        bcrypt.hash(newUser.password, salt, (e, hashedPassword) => {
          if (e) {
            throw e;
          }
          newUser.password = hashedPassword;
          newUser
            .save()
            .then(user => {
              res.json(user);
            })
            .catch(e => console.log(e));
        });
      });
    }
  });
});
//

// GET api/users/login | desc: login user and return a jwt| acces: public
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  //Find user by email
  User.findOne({ email }).then(user => {
    //Check for user
    if (!user) {
      return res.status(404).json({ email: 'User email not found..' });
    }

    //Check password
    bcrypt.compare(password, user.password).then(Matched => {
      if (Matched) {
        const payload = {
          id: user._id,
          name: user.name,
          avatar: user.avatar
        };

        //Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({ success: true, token: 'Bearer ' + token });
          }
        );
      } else {
        return res.status(400).json({ password: 'Password incorrect.' });
      }
    });
  });
});
//

// GET api/users/current | desc: returns current user | acces: private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
  }
);
//
module.exports = router;
