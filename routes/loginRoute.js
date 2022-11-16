const express = require('express')
const loginRouter = express.Router()

const Login = require('../Controllers/LoginController')

loginRouter.route('/')
    .get(Login)

module.exports = loginRouter