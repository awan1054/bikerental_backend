const mongoose=require("mongoose")
const Schema= mongoose.Schema
const providerSchema=new Schema({
    name:{
        type:String,
        required:[true,"Name must be provided"]
    },
    contactNo:{
        type:String,
        required:[true,"contact number must be provided"],
        minlength:10,
        maxlength:10
    },
    email:{
        type:String,
        required:true
    },
    vatNo:{
        type:String,
    },
    panNo:{
        type:String,
    },
    location:{
        type:String,
        requred:[true,"A location must be provided"]
       
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    status:{
        type:String,
        enum:[
            'active','inactive','pending'
        ],
        default:'pending'
    }
})
const Provider=mongoose.model("Provider",providerSchema)
module.exports=Provider