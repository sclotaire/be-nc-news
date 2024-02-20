const express = require('express');
const app = express();
const { getTopics, getApi } = require('./controllers/topicsAndApi.controller')
const {getArticlesById, getAllArticles} = require('./controllers/articles.controller')

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api', getApi);

app.get('/api/articles/:article_id', getArticlesById);

app.get('/api/articles', getAllArticles)

// error handling middlesware starts here:

app.use((err, req, res, next) => {
    if (err.status && err.msg){
        res.status(err.status).send({msg: err.msg})
    }
    next(err)
})

app.use((err, req, res, next) => {
    res.status(400).send({msg: 'Bad request'})
})

module.exports = app;