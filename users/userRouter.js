const express = require('express');
const Users = require('../users/userModel');
const restricted = require('../auth/restricted-middleware');

const router = express.Router();

//get (GET) --> endpoint beginning with api/users
router.get('/', restricted, onlyDepartment('jedi'), (req, res) => {
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

//only 'department' shows when getting users
function onlyDepartment(department) {
  return function(req, res, next) {
    console.log(req.user.department);
    if (req.user && req.user.department === department) {
      next();
    } else {
      res.status(403).json({ message: 'This shows only departments' });
    }
  };
}

module.exports = router;
