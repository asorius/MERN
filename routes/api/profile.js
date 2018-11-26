const express = require('express');
const router = express.Router();
// GET api/profile/test | desc: tests profile route | acces: public
router.get('/test', (req, res) => {
  res.json({ msg: 'Profile Works' });
});
//
module.exports = router;
