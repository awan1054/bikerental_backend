const mongoose=require("mongoose")
const Schema=mongoose.Schema

const bookSchema=new Schema({
     customerId:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"user"
       },
    bike:{
        type:mongoose.Schema.Types.ObjectId, ref:"Bike"
    },
    Name:{
        type: String,
        required:true
    },
    email:{
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    contactNumber :{
        type: Number,
        required : true
    },
  
    citizenship: {
        type: String, // Reference to the file stored in GridFS
        required: true,
        // Optional: Reference to an 'Image' model for additional metadata
    },
    licence: {
        type: String,
        required: true,
        
    },
totalamount:{
type:String,
},
    status :{
        type: String,
        enum: ["pending","cancel","booked"],
        default : "pending"
    },
    paymentmethod:{
type:String,
enum:['cod','khalti']
    },
    paymentstatus:{
        type: String,
        enum:['pending','paid','unpaid'],
        default:"pending"
    }
})

const book = mongoose.model("book",bookSchema)
module.exports = book