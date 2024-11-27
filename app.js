require("dotenv").config()
const express=require("express")
const connectTodb = require(".")
const { registeruser, loginuser, forgotPassword, resetPassword } = require("./controller/authentication")
const { addBike, getALLBikes, getBike, deleteBike, updateBike } = require("./controller/bike")

const app=express()
connectTodb()
const {multer,Storage}=require("./Services/multerConfig")
const adminSeeder = require("./adminSeeder")
const checkidLoginOrNot = require("./middleware/checkidLoginOrNot")
const upload=multer({storage:Storage})
app.use(express.json())//incoming json data bujna sakna capability dinxa

//register api
app.post("/register",registeruser)
app.post("/login",loginuser)
app.post("/forgot_password",forgotPassword)
app.post("/reset_password",resetPassword)

//bike api
app.post("/add-bike",checkidLoginOrNot,upload.single("image"),addBike)
app.get("/get-bikes",getALLBikes)
app.get("/get-single/:id",getBike)
app.delete("/deletebike/:id",deleteBike)
app.patch("/updatebike/:id",updateBike)



const port=process.env.port
app.listen(port,()=>{

    console.log("server backend has started at "+port)
    adminSeeder()
})