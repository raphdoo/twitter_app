const express = require('express')
const loginRouter = express.Router()

loginRouter.route('/')
    .get(LoginPage)

