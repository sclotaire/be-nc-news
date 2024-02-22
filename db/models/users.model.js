const db = require('../connection')

function selectAllUsers(){
    return db.query('SELECT * FROM users')
    .then((result) => {
        return result.rows
    })
}

module.exports = selectAllUsers