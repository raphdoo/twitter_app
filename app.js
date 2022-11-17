const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const Database = require("./database")
const config = require('./config')

const { requireLogin } = require('./middleware/authenticate')
const LoginRoute = require('./routes/UserRoute')

const port = config.port

//Database Configuration
Database.connect()

//setting up the view engine
app.set("view engine", "pug")
app.set("views", "views")

app.use(bodyParser.urlencoded({ extended:false }))

//serving static files
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', LoginRoute)

app.get('/', requireLogin, (req,res,next)=>{

    const title_payload = {
        home: "home",
        Login: "Login"

    }

    res.status(200).render('home', title_payload)
})

const server = app.listen(port, ()=>{
    console.log(`Server is listening at port ${port} `)
})
