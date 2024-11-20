const mongoose=require("mongoose")
const connectTodb=async()=>{
    await mongoose.connect(process.env.db_url)
    console.log("database connected successfully")

}
module.exports=connectTodb