const model = require('../../model/user/userDetail')
const response = require('../../helper/response')
const upload = require('../../util/multer')
const multer = require("multer")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const saltRounds = 10

module.exports = {
  //Regiter
  createProfile: async (req, res) => {
    const { email, name, password } = req.body
    if(email && name && password && email !== '' && name !=='' && password !==''){
      const isExsist = await model.getProfile({ email })
      if (isExsist.length < 1){
        const userData = {
          name,
          email,
          password: bcrypt.hashSync(password, saltRounds)
        }
        const result = await model.createProfile(userData)
        if (result) {
          res.status(200).send(response({
              success: true,
              msg: 'Register success',
            }))
        } else {
          res.status(500).send(response({
              msg: 'Something wrong try again',
            }))
        }
      } else {
        res.status(400).send(response({
          msg: 'Email alredy in use'
        }))
      }
    } else {
      res.status(400).send(response({
          msg: 'All form must be filled'
        }))
    }
  },

  //Login
  getProfile: async (req, res) => {
    const { password, email } = req.body
    const result = await model.getProfile({ email })

    if (result.length < 1) {
      res.status(400).send(response({
          msg: 'Profile not found'
        }))
    } else {
      const checkPassword = bcrypt.compareSync(password, result[0].password, (err, res) => {
        return res
      })
      if (checkPassword){
        const data = {
          result,
          token: jwt.sign(
            {
              id: result[0].id,
              name: result[0].name,
              about: result[0].a,
              avatar: result[0].avatar,
              email
            },
            process.env.JWT_KEY
            )
        }
        res.status(200).send(response({
          success: true,
          msg: 'Login success',
          data
        }))
      } else {
        res.status(200).send(response({
            msg: 'Wrong password'
          }))
      }
    }
  },

  //Update profile from Databse by id
  editProfile: async (req, res) => {
    const { id } = req.params
    const {name, email, about} = req.body
    const result = await model.getProfile({ id: parseInt(id) })
    const editData = [
            { name, email, about},
            {id: parseInt(id)}
          ]

    if (result.length < 1) {
      res.status(400).send(response({
          msg: 'Profile not found'
        }))
    } else {
      const editProfile = await model.editProfile(editData)

      if (editProfile) {
        res.status(200).send(response({
            success: true,
            msg: 'Update profile success',
            data: editData[0]
          }))
      } else {
        res.status(500).send(response({
            msg: 'Something wrong try again !',
          }))
      }
    }
  },

  editAvatar: async (req, res) => {
    const { id } = req.params
    const result = await model.getProfile({id: parseInt(id)})

    if (result.length < 1) {
      res.status(400).send(response({
          msg: 'Profile not found'
        }))
    } else {
      upload(req, res, async function (err) {
        // error handle
        if (err) {
          res.status(400).send(response({
              msg: err.message || 'Only image jpeg/jpg/png are allowed'
            }))
        } else if (!req.file) { //  error handle no file selected
            res.status(400).send(response({
                msg: 'No file selected'
              }))
        } else { // if filter image success
          const editData = [
              { avatar: `avatar/profile/${req.file.filename}`},
              { id: parseInt(id) }
              ]

          const uploadImage = await model.editProfile(editData)
          if (uploadImage) { // upload image success
            res.status(200).send(response({
                success: true,
                msg: 'upload success',
                data: editData[0]
              }))
          } else { // upload image failed
            res.status(500).send(response({
                msg: 'Something wrong try again !'
              }))
          }
        }
      })
    }
  }
}