const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

//UserSchema
const User = require('../Models/UserSchema')

//TweetSchema
const Tweet = require('../Models/TweetSchema')

//body-parser config
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended:false }))

//Create a tweet
const CreateTweet = async (req, res, next)=>{

    if(!req.body.content){
        console.log("content not provided");
        res.sendStatus(400);
        return;

    }

    const postData = {
        content : req.body.content,
        postedBy: req.session.user
    }

    //handling tweet reply text
    if(req.body.replyTo){
        postData.replyTo = req.body.replyTo
    }

    let tweet = await Tweet.create(postData)
    tweet = await User.populate(tweet, {path: "postedBy"})
    .catch((err)=>{ console.log(err); return res.sendStatus(400);})



    res.status(201).send(tweet);

}

//Get tweets
const getTweets = async (req, res, next) =>{
    let tweets = await Tweet.find({})
    .populate("retweetData")
    .populate("postedBy")
    .populate("replyTo")
    .sort({createdAt: -1}) //starting from the latest
    .catch((err)=> {console.log(err); return res.sendStatus(400)})

    tweets = await User.populate(tweets, {path: "replyTo.postedBy"})
    tweets = await User.populate(tweets, {path: "retweetData.postedBy"})

    res.status(200).send(tweets)
}

const getOneTweet = async (req, res, next) =>{
    const postId = req.params.id
    let postData = await getTweet({_id : postId});
    postData = postData[0];

    let result = {
        postData: postData
    }

    if(postData.replyTo !== undefined){
        result.replyTo = postData.replyTo
    }

    result.replies = await getTweet({replyTo: postId})

    res.status(200).send(result)
}

const getTweetPage = async (req, res, next) =>{
    const payload = {
        page_title: "View page",
        isLoggedInUser: req.session.user,
        isLoggedInUserJs: JSON.stringify(req.session.user),
        postId : req.params.id
    }

    res.status(200).render("postPage", payload)
}

//updating the like button
const updateLikeButton = async (req, res, next)=>{
    const postId = req.params.id
    const userId = req.session.user._id

    //check if like property exists and if it already include postId
    let isLiked = req.session.user.likes && req.session.user.likes.includes(postId);

    //$addToSet adds to an array object in mongoose and ensure uniqueness of ids in the array while $pull removes the id from array object
    //checking if already liked, if true, pull; else, addToSet
    let option = isLiked ? "$pull" : "$addToSet"
    
    //Insert user like and also update the information to the current user session
    //square bracket allows to use variable as option in mongoose
    req.session.user = await User.findByIdAndUpdate(userId, {[option]: {likes: postId}}, {new:true})
    .catch(err=> {console.log(err); return res.sendStatus(400)})

    //Insert post like
    let tweet = await Tweet.findByIdAndUpdate(postId, {[option]: {likes: userId}}, {new:true})
    .catch(err=> {console.log(err); return res.sendStatus(400)})

    res.status(200).send(tweet)

}

const reTweet = async (req, res, next)=>{
    const postId = req.params.id
    const userId = req.session.user._id

    //try and delete retweet to check if retweetData exists
    let deletedTweet = await Tweet.findOneAndDelete({postedBy:userId, retweetData:postId})

    //$addToSet adds to an array object in mongoose and ensure uniqueness of ids in the array while $pull removes the id from array object
    //checking if already in retweetData , if true, pull; else, addToSet
    let option = deletedTweet != null ? "$pull" : "$addToSet"

    let retweet = deletedTweet;

    if(retweet == null){
        retweet = await Tweet.create({postedBy:userId, retweetData:postId})
    }
    
    //Insert user like and also update the information to the current user session
    //square bracket allows to use variable as option in mongoose
    req.session.user = await User.findByIdAndUpdate(userId, {[option]: {retweets: retweet._id}}, {new:true})
    .catch(err=> {console.log(err); return res.sendStatus(400)})

    //Insert post like
    let tweet = await Tweet.findByIdAndUpdate(postId, {[option]: {retweetUsers: userId}}, {new:true})
    .catch(err=> {console.log(err); return res.sendStatus(400)})

    res.status(200).send(tweet)
}

async function getTweet(filter){
    let tweets = await Tweet.find(filter)
    .populate('postedBy')
    .populate('retweetData')
    .populate('replyTo')
    .sort({createdAt: -1}) //starting from the latest

    tweets = await User.populate(tweets, {path: "replyTo.postedBy"})
    return await User.populate(tweets, {path: "retweetData.postedBy"})

}

module.exports = {CreateTweet, getTweets,getOneTweet, getTweetPage, updateLikeButton, reTweet}