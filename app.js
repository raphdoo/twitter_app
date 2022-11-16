const express = require('express')
const app = express()

const port = 3003

app.set("view engine", "pug")
app.set("views", "views")

const server = app.listen(port, ()=>{
    console.log(`Server is listening at port ${port} `)
})

app.get('/', (req,res,next)=>{
    res.status(200).send('Hello')
})