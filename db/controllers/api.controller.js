const endpointsData = require('../../endpoints.json')

function getApi(req, res, next){
    res.status(200).send({endpointsData})  
    .catch((err) => {
        next(err)
    })
}

module.exports = getApi