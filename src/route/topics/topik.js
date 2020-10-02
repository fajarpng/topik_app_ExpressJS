const router = require('express').Router()
const controller = require('../../controller/topics/topik')
const verifyToken = require('../../util/auth')
const { createTopik, getTopik, editTopik, deleteTopik} = controller

router
	.get('/:id?', getTopik)
	.use(verifyToken)
	.post('/', createTopik)
	.delete('/:id', deleteTopik)
	.patch('/:id', editTopik)

module.exports = router
