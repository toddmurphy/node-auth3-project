const db = require('../data/dbConfig');

module.exports = {
  //export helper functions here
  getUsers,
  findBy,
  addUser,
  getUserbyID,
  findByDepartment
};

//get users
function getUsers() {
  return db('users');
}

//findBy -- login --> finding by username
function findBy(user) {
  return db('users')
    .where('username', user) // 'username' is the column --> user is who we're passing in
    .first();
}

//getUserbyID --> get single user
function getUserbyID(id) {
  return db('users')
    .where('id', id) //greed 'id' is the column, red 'id' is the id passing of user we looking for
    .first();
}

//findByDepartment --> find by department
function findByDepartment(role) {
  return db('users')
    .select('id', 'username', 'department')
    .where('department', '=', role);
}

//addUser --> create a new user
function addUser(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      console.log(ids);
      return getUserbyID(ids[0]);
    });
}
