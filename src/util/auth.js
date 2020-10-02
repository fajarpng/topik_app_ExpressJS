const jwt = require('jsonwebtoken')
const response = require('../helper/response')

const verifyToken = (req, res, next) => {
    const bearerHeader = req.header('Authorization')
    if (typeof bearerHeader !== 'undefined' && bearerHeader !== '') {
        const bearer = bearerHeader.split('Bearer ')
        const bearerToken = bearer[1]
        token = bearerToken
    } else {
        res.status(401).send(response({
            msg: 'Access denied, You need to login first !'
        }))
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_KEY)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).send(response({
            msg: 'Access denied, you need to re-Login'
        }))
    }
}

module.exports = verifyToken