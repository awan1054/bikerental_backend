const mongoose=require("mongoose")
const Schema=mongoose.Schema
 const userSchema=new Schema({
    username:{
        type:String,
        required:true//compulsory halnai paro
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:Number
    }
})
const user=mongoose.model("user",userSchema)// table banako user vannne ani column (userschema ) sanga connect gareko
module.exports=user