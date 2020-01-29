const express = require('express');
const Users = require('../users/userModel');

const router = express.Router();

//get (GET) --> endpoint beginning with api/users
router.get('/', (req, res) => {
  Users.getUsers()
    .then(user => {
      console.log('inside getUsers', user);
      res.status(200).json(user);
    })
    .catch(error => {
      console.log('inside getUsers', error);
      res.status(500).json({ message: 'Sorry, no users returned from the server', error });
    });
});

module.exports = router;
