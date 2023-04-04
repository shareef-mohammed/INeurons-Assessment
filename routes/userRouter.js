const express = require('express');
const { getUsers, addUser, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.route('/users')
    .get(getUsers)
    .post(addUser)

router.route('/users/:id')
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;