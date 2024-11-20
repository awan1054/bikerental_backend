require("dotenv").config()
const express=require("express")
const connectTodb = require(".")
const app=express()
connectTodb()



const port=process.env.port
app.listen(port,()=>{
    console.log("server backend has started at "+port)
})