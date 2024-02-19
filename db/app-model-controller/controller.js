const { selectTopics } = require('./model')
const fs = require('fs')
const endpointsData = require('../../endpoints.json')

function getTopics(req, res, next){
    selectTopics().then((topics) => {
        res.status(200).send({topics})
    })
}

function getApi(req, res, next){
        res.status(200).send({endpointsData})  
}
module.exports = { getTopics, getApi }