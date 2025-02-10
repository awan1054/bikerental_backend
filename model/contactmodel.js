const mongoose=require("mongoose")
const Schema=mongoose.Schema

const contactmodel=new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
})

const contact = mongoose.model("contact",contactmodel)
module.exports = contact