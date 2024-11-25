const mongoose=require("mongoose")
const Schema=mongoose.Schema
const bikeshcema=new Schema({
    name:{
        type: String,
            required: [true,"Bike name must be provided"]
    },
    price:{
        type: Number,
        required: [true,"Bike price must be provided"]
    },
    brand:{
        type:String,
        required:[true,"Bike brand must be provided"]
    },
    description:{
        type:String,
        required:[true,"Bike description must be provided"]
        
    },
    image: String,
category:{
    type:String,
    enum:["bike","scooter"],
    default:"bike"
}

})
const Bike=mongoose.model("Bike",bikeshcema)
module.exports=Bike