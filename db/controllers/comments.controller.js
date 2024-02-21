const selectAllComments = require('../models/comments.model')

function getAllComments(req, res, next){
    const { article_id } = req.params
    selectAllComments(article_id).then((comments) => {
        res.status(200).send({comments})
    })
    .catch(next)
}

module.exports = getAllComments