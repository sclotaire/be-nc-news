const {selectArticlesById, selectAllArticles, updateArticle} = require('../models/articles.model')

function getArticlesById(req, res, next){
    const { article_id } = req.params
    selectArticlesById(article_id).then((article) => {
        res.status(200).send({article})
    })
    .catch(next)
};

function getAllArticles(req, res, next){
    const { topic } = req.query
    selectAllArticles(topic).then((allArticles) => {
        res.status(200).send({allArticles})
    })
    .catch(next)
}

function patchArticle(req, res, next){
    const { article_id } = req.params
    const update = req.body.inc_votes
    updateArticle(article_id, update).then((article) => {
        res.status(200).send({article})
    })
    .catch(next)
}

module.exports = {getArticlesById, getAllArticles, patchArticle}