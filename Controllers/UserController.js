const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

//UserSchema
const User = require('../Models/UserSchema')

//body-parser config
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended:false }))


//Render the Login page
const Login = (req, res, next)=>{
    res.status(200).render('login')
}

//Login a user
const LoginUser = async (req, res, next)=>{
    const {Identity, Password} = req.body

    const payload = req.body

    if(Identity && Password){
        const user = await User.findOne({
            $or:[
                {Username:Identity},
                {Email:Identity}
            ]
        })
        .catch((error)=>{
            console.log(error)

            payload.errorMessage = "There was an error treating this request"
            res.status(200).render('login', payload)
        })
        if(user){
            let result = await bcrypt.compare(Password, user.Password)
            if(result){
                req.session.user = user;
                return res.redirect('/')
            }
            else{
                payload.errorMessage = "Details not correct, please try again"
                return res.status(403).render('login', payload)
            }
        }else{
            payload.errorMessage = "Details not correct, please try again"
            return res.status(403).render('login', payload)
        }
    }else{
        payload.errorMessage = "Please fill all fields to proceed"
        res.status(403).render('login', payload)
    }
}

//Render the user Register page
const SignUp = (req, res, next)=>{
    res.status(200).render('register')
}

//Register a user
const CreateUser = async (req,res,next)=>{

    //Remove white spaces at beginning and end of inputs
    const firstname = req.body.Firstname.trim();
    const lastname = req.body.Lastname.trim();
    const username = req.body.Username.trim();
    const email = req.body.Email.trim();
    const password = req.body.Password;

    const payload = req.body

    //check that value exists
    if(firstname && lastname && username && email && password){
        //Check that username or email does not already exist in the database
        const user = await User.findOne({
            $or: [
                {Username:username}, 
                {Email:email}
            ]
        })

        //catch any query error
        .catch(error =>{
            console.log(error)
            payload.errorMessage = "There was an error treating this request"
            res.status(500).render('register', payload)
        })

        //saving to user collection
        if(user == null){
            let data = req.body;
            data.Password = await bcrypt.hash(password, 10)

            const newUser = await User.create(data)

            req.session.user = newUser
            res.status(201).redirect('/')
        }
        else{
            if(user.Email == email){
                payload.errorMessage = "Email already exists"

            }else{
                payload.errorMessage = "Username already exists"
            }
            res.status(403).render('register', payload)
        }

    }else{
        payload.errorMessage = "Please fill all fields to proceed"
        res.status(403).render('register', payload)
    }


}

//Logout user
const Logout = (req, res, next)=>{
    if(req.session){
        req.session.destroy(()=>{
            res.redirect('/login')
        })
    }
}

module.exports = {Login, LoginUser, SignUp, CreateUser, Logout}