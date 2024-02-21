const express = require('express');
const app = express();
const getTopics = require('./controllers/topics.controller')
const getApi = require('./controllers/api.controller')
const {getArticlesById, getAllArticles} = require('./controllers/articles.controller')
const getAllComments = require('./controllers/comments.controller')
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require('./errorhandling')

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api', getApi);

app.get('/api/articles/:article_id', getArticlesById);

app.get('/api/articles', getAllArticles)

app.get('/api/articles/:article_id/comments', getAllComments)

app.use(handleCustomErrors)

app.use(handlePsqlErrors)

app.use(handleServerErrors)


module.exports = app;