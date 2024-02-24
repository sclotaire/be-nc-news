const db = require('../connection')

function selectAllComments(article_id) {
    return db.query('SELECT * FROM comments WHERE article_id=$1 ORDER BY created_at DESC', [article_id])
        .then((result) => {
            if (result.rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'Not found' })
            }
            return result.rows
        })
}

function insertComment(article_id, { author, body }) {
    return db.query('INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *', [article_id, author, body])
        .then((result) => {
            if (result.rows[0].body.length === 0){
                return Promise.reject({ status: 400, msg: 'Bad request'})
            }
            return result.rows[0].body
        })
        .catch((err) => {
            if (err.code === '23503') {
                return Promise.reject({ status: 404, msg: 'Not found' })
            }
            else next(err)
        })
}

function removeComment(comment_id){
    return db.query('DELETE FROM comments WHERE comment_id = $1', [comment_id])
    .then((result) => {
        if (result.rowCount === 0){
            return Promise.reject({ status: 404, msg: 'Not found'})
        }
        return result.rows[0]
    })
}

module.exports = { selectAllComments, insertComment, removeComment }