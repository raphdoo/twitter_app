const express = require('express')
const TweetRouter = express.Router()

const { CreateTweet, getTweets, updateLikeButton, reTweet} = require('../Controllers/TweetController')

TweetRouter.route('/')
    .get(getTweets)
    .post(CreateTweet)

TweetRouter.route('/:id/like')
    .put(updateLikeButton)

TweetRouter.route('/:id/retweet')
    .post(reTweet)

module.exports = TweetRouter