const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Database = require("./database");
const config = require('./config');
const session = require('express-session');

const { requireLogin } = require('./middleware/authenticate');
const UserRoute = require('./routes/UserRoute');
const TweetRoute = require('./routes/TweetRoute');
const ProfileRoute = require('./routes/TweetRoute');


const port = config.port

//Database Configuration
Database.connect()

//setting up the view engine
app.set("view engine", "pug")
app.set("views", "views")

app.use(bodyParser.urlencoded({ extended:false }))

//serving static files
app.use(express.static(path.join(__dirname, 'public')))

//session configuration
app.use(session({
    secret: config.SECRET,
    resave:true,
    saveUninitialized:false
}))

app.use('/tweet', TweetRoute)
app.use('/', UserRoute)

app.get('/', requireLogin, (req,res,next)=>{

    //payload object for the home route
    const payload = {
        page_title: "Home",
        isLoggedInUser: req.session.user,
        isLoggedInUserJs: JSON.stringify(req.session.user)

    }

    res.status(200).render('home', payload)
})

const server = app.listen(port, ()=>{
    console.log(`Server is listening at port ${port} `)
})
