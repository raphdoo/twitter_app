//importing the mongoose database ORM
const mongoose = require("mongoose")
const Schema = mongoose.Schema

//modelling the leader schema
const UserSchema = new Schema({
    Email:{
        type: String,
        required: true,
        unique:true
    },
    Username:{
        type: String,
        required:true,
        unique:true
    },
    Password:{
        type: String,
        required: true
    },
    Firstname:{
        type: String,
        required: true
    },
    Lastname:{
        type: String,
        required: true
    },
    profilePic:{
        type:String,
        default: 'images/ProfilePic.png'
    }
},{
    timestamps:true
})



const users = mongoose.model("User", UserSchema) //creating the model

module.exports = users //exporting the created model