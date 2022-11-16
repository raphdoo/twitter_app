const express = require('express')
const app = express()

const { requireLogin } = require('./middleware/authenticate')
const LoginRoute = require('./routes/loginRoute')

const port = 3003


//setting up the view engine
app.set("view engine", "pug")
app.set("views", "views")

app.use('/login', LoginRoute)

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
