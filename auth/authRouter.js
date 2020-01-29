const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../users/userModel');

const router = express.Router();

//register (POST) --> for endpoint beginning with api/auth
router.post('/register', (req, res) => {
  //add logic here
  const newUser = req.body;

  Users.addUser(newUser)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log('in AuthRouter', error);
      res.status(500).json({ message: 'Sorry, no new user created on server', error });
    });
});

//login (POST) --> for endpoint beginning with api/auth
router.post('/login', (req, res) => {
  //add logic here
});

module.exports = router;
