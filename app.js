require("dotenv").config()
const express=require("express")
const connectTodb = require(".")
const { registeruser, loginuser, forgotPassword, resetPassword } = require("./controller/authentication")
const { addBike, getALLBikes, getBike, deleteBike, updateBike } = require("./controller/bike")

const app=express()
connectTodb()

const adminSeeder = require("./adminSeeder")
const checkidLoginOrNot = require("./middleware/checkidLoginOrNot")
const accessTo = require("./middleware/accessTo")

const { getAlluser, deleteUser } = require("./controller/admin/admincontroller")
const { becomeAprovider, changeProviderStatus } = require("./controller/provider")

const userRoute=require("./routes/userRoutes")
const bikeRoute=require("./routes/bikeroute")
const adminRoute=require("./routes/adminRoute")
const providerRoute=require("./routes/providerRoute")
app.use(express.json())//incoming json data bujna sakna capability dinxa


//authentication api
app.use("/user",userRoute)
//bike api
app.use("/bike",bikeRoute)

//admin api
app.use("/admin",adminRoute)



//provider api
app.use("/provider",providerRoute)

const port=process.env.port
app.listen(port,()=>{

    console.log("server backend has started at "+port)
    adminSeeder()
})