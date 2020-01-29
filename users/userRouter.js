const express = require('express');
const Users = require('../users/userModel');

const router = express.Router();

//get (GET) --> endpoint beginning with api/users
router.get('/', (req, res) => {
  //add logic here
});

module.exports = router;
