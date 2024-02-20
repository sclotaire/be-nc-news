const db = require('../connection');


function selectTopics(){
    return db.query('SELECT * FROM topics')
    .then((result) => {
       // console.log(result.rows)
        return result.rows
    })
}


module.exports = { selectTopics }