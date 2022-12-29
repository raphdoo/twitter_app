const express = require('express')
const TweetRouter = express.Router()
const { requireLogin } = require('../middleware/authenticate')


const { CreateTweet, getTweets,getOneTweet,getTweetPage,  updateLikeButton, reTweet, deleteTweet} = require('../Controllers/TweetController')

TweetRouter.route('/')
    .get(getTweets)
    .post(CreateTweet)

TweetRouter.route('/:id/like')
    .put(updateLikeButton)

TweetRouter.route('/:id/retweet')
    .post(reTweet)

TweetRouter.route('/:id')
    .get(getOneTweet)
    .delete(deleteTweet)

TweetRouter.route('/page/:id')
    .get(requireLogin, getTweetPage)

module.exports = TweetRouter