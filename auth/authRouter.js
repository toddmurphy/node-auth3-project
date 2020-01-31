const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/userModel');

const router = express.Router();

//register (POST) --> for endpoint beginning with api/auth
router.post('/register', (req, res) => {
  const newUser = req.body;

  //create hash for password using bcrypt
  const hash = bcrypt.hashSync(newUser.password, 10);
  newUser.password = hash;

  Users.addUser(newUser)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log('in AuthRouter', error);
      res.status(500).json({ message: 'Sorry, no new user created on server', errorMessage: error.message });
    });
});

//login (POST) --> for endpoint beginning with api/auth
router.post('/login', (req, res) => {
  const { username, password, department } = req.body;

  Users.findBy(username)
    .first()
    .then(user => {
      console.log('inside user findBy', user);
      if (user && bcrypt.compareSync(password, user.password)) {
        //create the token
        const token = signToken(user);

        res.status(200).json({ message: `Welcome ${user.username}, we have a token: ${token}. You currently work in the ${user.department} department.` });
      } else {
        res.status(401).json({ message: 'Sorry, Invalid credentials! ' });
      }
    })
    .catch(error => {
      console.log('inside login', error);
      res.status(500).json({ message: 'Sorry, login not working on the server', error });
    });
});

function signToken(user) {
  const payload = {
    //add any data we want to store in token payload
    user
  };

  const options = {
    //check documentation for other options available
    expiresIn: '1d'
  };

  //return and extract the secret away so it can required and used where needed
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
