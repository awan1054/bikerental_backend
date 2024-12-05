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