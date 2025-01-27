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
        type: mongoose.Schema.Types.ObjectId, // Reference to the file stored in GridFS
        required: true,
        ref: 'Image', // Optional: Reference to an 'Image' model for additional metadata
    },
    license: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the file stored in GridFS
        required: true,
        ref: 'Image', // Optional: Reference to an 'Image' model for additional metadata
    },

    status :{
        type: String,
        enum: ["pending","cancel","booked"],
        default : "pending"
    }
})

const book = mongoose.model("book",bookSchema)
module.exports = book