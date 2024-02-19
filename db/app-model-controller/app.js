const express = require('express');
const app = express();
const { getTopics, getApi } = require('./controller')

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api', getApi);


module.exports = app;