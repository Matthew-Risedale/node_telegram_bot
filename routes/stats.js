const router = require('express').Router();
const {statModel} = require('../models');


router.route('/stats')
  .get(function (req, res) {
    statModel.find({})
      .then( data => res.send(data));
  })

module.exports = router;