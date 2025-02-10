const Bike = require("../../model/bikemodel")
const book = require("../../model/bookschema")
const Provider = require("../../model/providermodel")
const user = require("../../model/userModel")

exports.becomeAprovider=async(req,res)=>{
try{
    const {name,contactNo,email,vatNo,panNo,location}=req.body
const customerId=req.user.id
if(!name||!contactNo||!email||!location){
    return res.status(404).json({
        message:"please provide Name ,ContactNo ,Email,Location"
    })
}

await Provider.create({
    name,
    contactNo,
    email,
    location,
    vatNo,
    panNo,
    customerId:customerId
})
res.status(202).json({
    message:"Your form has been submitted, please wait for admin response"
})
}
catch (error) {
    res.status(404).json({

        message: "error xa",
        errmessage: error.message
    })

}
}

exports.changeProviderStatus=async(req,res)=>{
    const {status,providerId}=req.body
    const data=await Provider.findById(providerId)
    if(status=="active"){
await Provider.findByIdAndUpdate(providerId,{status:"active"})
await user.findByIdAndUpdate(data.customerId,{role:"provider"})
res.status(202).json({
    message:"Provider is active now"
})
    }
    else if(status=="inactive")
    {
        await Provider.findByIdAndUpdate(providerId,{status:"inactive"})
        res.status(202).json({
            message:"Provider is inactive now"
        })
    }
    else{
        res.status(400).json({
            message:"Invalid status"
        })
    }
}

exports.getAllusers=async(req,res)=>{
    const data=await user.find()
    res.status(200).json({
        message:"user fetched successfully",
        data:data
    })
}

exports.getAllBikesp=async(req,res)=>{
    const data=await Bike.find()
    res.status(202).json({
        message:"Bike fetched successfully",
        data:data
    })
}

exports.findBookeduser=async(req,res)=>{
    const data=await book.find().populate("bike")
    res.status(202).json({
        message:"booked users fetcched successfully",
        data:data
    })
}

exports.getbookeduser=async (req,res)=>{
    const id=req.params.id
    const data= await book.findById(id)
    res.status(200).json({
        message:"Booked user fetched successfully",

        data:data
    })
}

exports.deleteBookeduser=async (req,res)=>{
    const id=req.params.id
    const data= await book.findByIdAndDelete(id)
    res.status(200).json({
        message:"booked users  deleted successfully",

        data:data
    })
}