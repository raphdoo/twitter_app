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

    let tweet = await Tweet.create(postData)
    tweet = await User.populate(tweet, {path: "postedBy"})
    .catch((err)=>{ console.log(err); return res.sendStatus(400);})



    res.status(201).send(tweet);

}

//Get tweets
const getTweets = async (req, res, next) =>{
    const tweets = await Tweet.find({})
    .populate("postedBy")
    .sort({createdAt: -1}) //starting from the latest
    .catch((err)=> {console.log(err); return res.sendStatus(400)})

    res.status(200).send(tweets)
}

//updating the like button
const updateLikeButton = async (req, res, next)=>{
    const postId = req.params.id
    const userId = req.session.user_id

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


module.exports = {CreateTweet, getTweets, updateLikeButton}