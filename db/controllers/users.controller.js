const selectAllUsers = require('../models/users.model')

function getAllUsers(req, res, next) {
    selectAllUsers().then((users) => {
        res.status(200).send({users})
    })
}

module.exports = getAllUsers