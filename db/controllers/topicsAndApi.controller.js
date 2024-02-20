const { selectTopics } = require('../models/topicsAndApi.model')
const endpointsData = require('../../endpoints.json')

function getTopics(req, res, next){
    selectTopics().then((topics) => {
        res.status(200).send({topics})
    })
    .catch((err) => {
        next(err)
    })
}

function getApi(req, res, next){
        res.status(200).send({endpointsData})  
        .catch((err) => {
            next(err)
        })
}
module.exports = { getTopics, getApi }