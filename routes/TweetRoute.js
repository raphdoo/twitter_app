const express = require('express')
const TweetRouter = express.Router()

const { CreateTweet} = require('../Controllers/TweetController')

TweetRouter.route('/tweet')
    .post(CreateTweet)


module.exports = TweetRouter