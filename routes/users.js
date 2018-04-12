const router = require('express').Router();
const {userModel} = require('../models');


router.route('/users')
  .get(function (req, res) {
    userModel.find({})
      .then( data => res.send(data));
  })

module.exports = router;