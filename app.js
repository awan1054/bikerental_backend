require("dotenv").config()
const mongoose=require("mongoose")

const express=require("express")
const { registeruser, loginuser, forgotPassword, resetPassword } = require("./controller/authentication")
const { addBike, getALLBikes, getBike, deleteBike, updateBike } = require("./controller/bike")

const app=express()
const connectTodb=async()=>{
    await mongoose.connect(process.env.db_url)
    console.log("trigerr")
    console.log("database connected successfully")

}
connectTodb()

const adminSeeder = require("./adminSeeder")
const checkidLoginOrNot = require("./middleware/checkidLoginOrNot")
const accessTo = require("./middleware/accessTo")

const { getAlluser, deleteUser } = require("./controller/admin/admincontroller")
const { becomeAprovider, changeProviderStatus } = require("./controller/provider")
const cors = require("cors")

const userRoute=require("./routes/userRoutes")
const bikeRoute=require("./routes/bikeroute")
const adminRoute=require("./routes/adminRoute")
const providerRoute=require("./routes/providerRoute")
const bookRoute=require("./routes/bookRoute")
const contactRoute=require("./routes/contactRoute")
app.use(express.json())//incoming json data bujna sakna capability dinxa

app.use(cors({
    origin : "*"
}))
//authentication api
app.use("/user",userRoute)
//bike api
app.use("/bike",bikeRoute)

//admin api
app.use("/admin",adminRoute)



//provider api
app.use("/provider",providerRoute)

//for booking
app.use("/booknow",bookRoute)
//for contact
app.use("/contact",contactRoute)

const port=process.env.port
app.use(express.static("./storage"))
app.listen(port, ()=>{

    console.log("server backend has started at "+port)
     adminSeeder()
})