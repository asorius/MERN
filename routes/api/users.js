const express = require('express');
const router = express.Router();
// GET api/users/test | desc: tests users route | acces: public
router.get('/test', (req, res) => {
  res.json({ msg: 'Users Works' });
});
//
module.exports = router;
