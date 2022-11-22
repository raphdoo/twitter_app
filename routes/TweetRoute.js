const express = require('express')
const TweetRouter = express.Router()

const { CreateTweet, getTweets, updateLikeButton} = require('../Controllers/TweetController')

TweetRouter.route('/')
    .get(getTweets)
    .post(CreateTweet)

TweetRouter.route('/:id/like')
    .put(updateLikeButton)

module.exports = TweetRouter