const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()

//Express config
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Routes config
require('./routes')(app) 

app.get("/",(req,res)=>{
  res.json({message: "Hello !"})
})

mongoose.connect(process.env.DB_URL)
.then(()=>{
  console.log("Connected !")
  app.listen(3000)
})
.catch((err)=>{console.log(err)})



