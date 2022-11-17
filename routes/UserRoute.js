const express = require('express')
const loginRouter = express.Router()

const {Login, SignUp, CreateUser} = require('../Controllers/UserController.js')

loginRouter.route('/login')
    .get(Login)

loginRouter.route('/register')
    .get(SignUp)
    .post(CreateUser)

module.exports = loginRouter