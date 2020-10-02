const router = require('express').Router()
const controller = require('../../controller/user/userDetail')
const verifyToken = require('../../util/auth')
const { createProfile, getProfile, editProfile, editAvatar } = controller

router
	.post('/login', getProfile)
	.post('/', createProfile)
	.use(verifyToken)
	.patch('/:id', editProfile)
	.patch('/avatar/:id', editAvatar)

module.exports = router
