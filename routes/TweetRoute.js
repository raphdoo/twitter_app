const express = require('express')
const TweetRouter = express.Router()

const { CreateTweet, getTweets,getOneTweet, updateLikeButton, reTweet} = require('../Controllers/TweetController')

TweetRouter.route('/')
    .get(getTweets)
    .post(CreateTweet)

TweetRouter.route('/:id/like')
    .put(updateLikeButton)

TweetRouter.route('/:id/retweet')
    .post(reTweet)

TweetRouter.route('/:id')
    .get(getOneTweet)

module.exports = TweetRouter