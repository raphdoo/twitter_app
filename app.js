const express = require('express')
const app = express()

const { requireLogin } = require('./middleware/authenticate') 

const port = 3003


//setting up the view engine
app.set("view engine", "pug")
app.set("views", "views")


const server = app.listen(port, ()=>{
    console.log(`Server is listening at port ${port} `)
})

app.get('/', (req,res,next)=>{

    const payload = {
        title: "home"
    }

    res.status(200).render('home', payload)
})