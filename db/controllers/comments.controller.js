const { selectAllComments, insertComment, removeComment } = require('../models/comments.model')

function getAllComments(req, res, next){
    const { article_id } = req.params
    selectAllComments(article_id).then((comments) => {
        res.status(200).send({comments})
    })
    .catch(next)
}

function postComment(req, res, next){
    const newComment = req.body
    const { article_id } = req.params
    insertComment(article_id, newComment).then((comment) => {
        res.status(201).send({comment})
    })
    .catch(next)
}

function deleteComment(req, res, next){
    const {comment_id} = req.params
    removeComment(comment_id).then(() => {
        res.status(204).send()
    })
    .catch(next)
}

module.exports = {getAllComments, postComment , deleteComment}