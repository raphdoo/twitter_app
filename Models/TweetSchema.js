//importing the mongoose database ORM
const mongoose = require("mongoose")
const users = require("./UserSchema")
const Schema = mongoose.Schema

//modelling the leader schema
const TweetSchema = new Schema({
    content:{
        type: String,
        trim:true
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    pinned:Boolean,
    likes:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        }
    ],
    retweetUsers:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        }
    ],
    retweetData:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Tweet",
        }
    ]
},{
    timestamps:true
})



const tweets = mongoose.model("Tweet", TweetSchema) //creating the model

module.exports = tweets //exporting the created model