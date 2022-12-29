const express = require('express')
const ProfileRouter = express.Router()
const { requireLogin } = require('../middleware/authenticate')


const { } = require('../Controllers/Profile')

ProfileRouter.route('/')
    .get()
    .post()

ProfileRouter.route('/:id')
    .get()
    .delete()



module.exports = ProfileRouter;