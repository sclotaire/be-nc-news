const { response } = require('../app')
const db = require('../connection')

function selectAllComments(article_id) {
    return db.query('SELECT * FROM comments WHERE article_id=$1 ORDER BY created_at DESC', [article_id])
        .then((result) => {
            if (result.rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'article does not exist' })
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
            if (err.detail === 'Key (article_id)=(90) is not present in table "articles".') {
                return Promise.reject({ status: 404, msg: 'article does not exist' })
            }
            else if (err.detail === 'Key (author)=(i_dont_exist) is not present in table "users".') {
                return Promise.reject({ status: 404, msg: 'user does not exist' })
            }
            else next(err)
        })
}

module.exports = { selectAllComments, insertComment }