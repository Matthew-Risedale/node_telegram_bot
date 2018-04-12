const router = require('express').Router();

router.use('/api', require('./users'));
router.use('/api', require('./stats'));

module.exports = router;