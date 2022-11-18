const express = require('express')
const loginRouter = express.Router()

const {Login, LoginUser, SignUp, CreateUser, Logout} = require('../Controllers/UserController.js')

loginRouter.route('/login')
    .get(Login)
    .post(LoginUser)

loginRouter.route('/register')
    .get(SignUp)
    .post(CreateUser)

loginRouter.route('/logout')
    .get(Logout)

module.exports = loginRouter