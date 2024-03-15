const db = require('../connection');

function selectArticlesById(article_id) {
    return db.query('SELECT articles.*, COUNT(comments.comment_id)::INT AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;', [article_id])
        .then((result) => {
            if (result.rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'Not found' })
            }
            return result.rows[0]
        })
}

function selectAllArticles(topic) {
    const queryValues = []
    let queryStr = 'SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.body) AS comment_count FROM articles JOIN comments ON articles.article_id = comments.article_id'
    if (topic) {
        const topicQuery = db.query('SELECT * FROM topics WHERE slug = $1', [topic])
        return topicQuery
        .then((result) => {
            if (result.rows.length === 0) {
                next(err)
            }
            else if (result.rows.length > 0){
            queryValues.push(topic)
        queryStr += ' WHERE topic = $1 GROUP BY articles.article_id ORDER BY articles.created_at DESC'
        return db.query(queryStr, [topic])
        .then((result) => {
            if (result.rows.length === 0){
                return Promise.reject({ status: 404, msg: 'Not found' })
            }
            return result.rows
        })
            }
        
    })
}
else if (!topic) {
    queryStr += ' GROUP BY articles.article_id ORDER BY articles.created_at DESC'
    return db.query(queryStr)
    .then((result) => {
        return result.rows
    })
}
}

function updateArticle(article_id, update) {
    return db.query('UPDATE articles SET votes=votes+$1 WHERE article_id=$2 RETURNING *', [update, article_id])
        .then((result) => {
            if (result.rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'Not found' })
            }
                return result.rows[0]
            
        })

}

module.exports = { selectArticlesById, selectAllArticles, updateArticle }


