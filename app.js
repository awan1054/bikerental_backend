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
const accessTo = require("./middleware/accessTo")

const { getAlluser, deleteUser } = require("./controller/admin/admincontroller")
const { becomeAprovider } = require("./controller/provider")
const upload=multer({storage:Storage})
app.use(express.json())//incoming json data bujna sakna capability dinxa

//register api
app.post("/register",registeruser)
app.post("/login",loginuser)
app.post("/forgot_password",forgotPassword)
app.post("/reset_password",resetPassword)

//bike api
app.post("/add-bike",checkidLoginOrNot,accessTo("admin"),upload.single("image"),addBike)
app.get("/get-bikes",getALLBikes)
app.get("/get-single/:id",getBike)
app.delete("/deletebike/:id",deleteBike)
app.patch("/updatebike/:id",updateBike)

//admin api
app.get("/admin/user",checkidLoginOrNot,accessTo("admin"),getAlluser)
app.delete("/admin/user/:id",checkidLoginOrNot,accessTo("admin"),deleteUser)



//provider api
app.post("/provider/become",checkidLoginOrNot,accessTo("customer"),becomeAprovider)



const port=process.env.port
app.listen(port,()=>{

    console.log("server backend has started at "+port)
    adminSeeder()
})