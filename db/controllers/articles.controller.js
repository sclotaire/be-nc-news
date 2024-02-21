const {selectArticlesById, selectAllArticles} = require('../models/articles.model')

function getArticlesById(req, res, next){
    const { article_id } = req.params
    selectArticlesById(article_id).then((article) => {
        res.status(200).send({article})
    })
    .catch(next)
};

function getAllArticles(req, res, next){
    selectAllArticles().then((allArticles) => {
        res.status(200).send({allArticles})
    })
    .catch(next)
}

module.exports = {getArticlesById, getAllArticles}