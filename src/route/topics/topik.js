const router = require('express').Router()
const controller = require('../../controller/topics/topik')
const verifyToken = require('../../util/auth')
const { createTopik, getTopik, editTopik, deleteTopik} = controller

router
	.get('/:id?', getTopik)
	.delete('/:id', deleteTopik)
	.use(verifyToken)
	.post('/', createTopik)
	.patch('/:id', editTopik)

module.exports = router
