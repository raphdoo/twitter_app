const express = require('express')
const TweetRouter = express.Router()
const { requireLogin } = require('../middleware/authenticate')


const { CreateTweet, getTweets,getOneTweet,getTweetPage,  updateLikeButton, reTweet} = require('../Controllers/TweetController')

TweetRouter.route('/')
    .get(getTweets)
    .post(CreateTweet)

TweetRouter.route('/:id/like')
    .put(updateLikeButton)

TweetRouter.route('/:id/retweet')
    .post(reTweet)

TweetRouter.route('/:id')
    .get(getOneTweet)

TweetRouter.route('/page/:id')
    .get(requireLogin, getTweetPage)

module.exports = TweetRouter