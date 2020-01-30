const express = require('express');
const Users = require('../users/userModel');
const restricted = require('../auth/restricted-middleware');

const router = express.Router();

//get (GET) --> endpoint beginning with api/users/department
router.get('/department', restricted, (req, res) => {
  Users.findByDepartment(req.user.department) //where is req.user.department , especially user coming from??
    .then(user => {
      console.log('inside findByDepartment', user);
      res.status(200).json(user);
    })
    .catch(error => {
      console.log('inside findByDepartment', error);
      res.status(500).json({ message: 'Sorry, no users returned from the server', error });
    });
});

//get (GET) --> endpoint beginning with api/users
router.get('/', restricted, (req, res) => {
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
