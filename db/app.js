const cors = require('cors');
const express = require('express');
const app = express();
const {getTopics, getArticlesByTopic} = require('./controllers/topics.controller')
const getApi = require('./controllers/api.controller')
const {getArticlesById, getAllArticles, patchArticle} = require('./controllers/articles.controller')
const {getAllComments, postComment, deleteComment} = require('./controllers/comments.controller')
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require('./errorhandling')
const getAllUsers = require('./controllers/users.controller')

app.use(cors());

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api', getApi);

app.get('/api/articles/:article_id', getArticlesById);

app.get('/api/articles', getAllArticles)

app.get('/api/articles/:article_id/comments', getAllComments)

app.post('/api/articles/:article_id/comments', postComment)

app.patch('/api/articles/:article_id', patchArticle)

app.delete('/api/comments/:comment_id', deleteComment)

app.get('/api/users', getAllUsers)

app.use(handleCustomErrors)

app.use(handlePsqlErrors)

app.use(handleServerErrors)


module.exports = app;