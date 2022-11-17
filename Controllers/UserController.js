const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended:false }))

const Login = (req, res, next)=>{
    res.status(200).render('login')
}
const SignUp = (req, res, next)=>{
    res.status(200).render('register')
}
const CreateUser = (req,res,next)=>{
    const Firstname = req.body.Firstname.trim();
    const Lastname = req.body.Lastname.trim();
    const Username = req.body.Username.trim();
    const Email = req.body.Email.trim();
    const Password = req.body.Password;

    const payload = req.body

    if(Firstname && Lastname && Username && Email && Password){

    }else{
        payload.errorMessage = "Please fill all fields to proceed"
        res.status(200).render('register', payload)
    }


}

module.exports = {Login, SignUp, CreateUser}