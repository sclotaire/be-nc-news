const db = require('../connection')

function selectAllComments(article_id){
    return db.query('SELECT * FROM comments WHERE article_id=$1 ORDER BY created_at DESC', [article_id])
    .then((result) => {
        if (result.rows.length === 0){
            return Promise.reject({status: 404, msg: 'article does not exist'})
        }
        return result.rows
    })
}

module.exports = selectAllComments