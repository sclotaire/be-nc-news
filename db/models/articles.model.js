const db = require('../connection');


function selectArticlesById(article_id){
    return db.query('SELECT * FROM articles WHERE article_id=$1;', [article_id])
    .then((result) => {
        if (result.rows.length === 0){
            return Promise.reject({status: 404, msg: 'article does not exist'})
        }
        return result.rows[0]
    })
}

function selectAllArticles(){
    return db.query('SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.body) AS comment_count FROM articles JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC')
    .then((result) => {
        return result.rows
    })
} 

function updateArticle(article_id, update){
    return db.query('SELECT * FROM articles WHERE article_id=$1', [article_id])
    .then((result) => {
        if (result.rows.length === 0){
             return Promise.reject({status: 404, msg: 'article does not exist'})
        }
        if (typeof update !== 'number'){
            next(err)
        }
        else if (typeof update === 'number'){let updatedArticle = result.rows[0]
        updatedArticle.votes += update
        return updatedArticle}
    })
}

module.exports = {selectArticlesById, selectAllArticles, updateArticle}

