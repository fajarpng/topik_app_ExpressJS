const router = require('express').Router()
const controller = require('../../controller/topics/comment')
const verifyToken = require('../../util/auth')
const { createComment, getComment, editComment, deleteComment} = controller

router
	.get('/:id?', getComment)
	.use(verifyToken)
	.post('/', createComment)
	.delete('/:id', deleteComment)
	.patch('/:id', editComment)

module.exports = router
