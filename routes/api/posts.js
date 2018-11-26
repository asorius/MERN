const express = require('express');
const router = express.Router();
// GET api/posts/test | desc: tests posts route | acces: public
router.get('/test', (req, res) => {
  res.json({ msg: 'Posts Works' });
});
//
module.exports = router;
