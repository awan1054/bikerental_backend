require("dotenv").config()
const express=require("express")
const connectTodb = require(".")
const { registeruser, loginuser } = require("./controller/authentication")
const app=express()
connectTodb()
app.use(express.json())//incoming json data bujna sakna capability dinxa

//register api
app.post("/register",registeruser)
app.post("/login",loginuser)


const port=process.env.port
app.listen(port,()=>{
    console.log("server backend has started at "+port)
})