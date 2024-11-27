const user = require("./model/userModel")
const bcrypt=require("bcryptjs")
const adminSeeder=async()=>{
    const data=await user.find({email:process.env.adminemail})
    if(data.length===0)
    {
        await user.create({
            email:process.env.adminemail,
            username:process.env.adminusername,
            password:bcrypt.hashSync(process.env.adminpassword),
            role:"admin"
            })
            console.log("admin seeded successfully")
    }
    else{
        console.log("admin already seeded no need to seed /insert again!!")
    }

}
module.exports=adminSeeder