const Provider = require("../../model/providermodel")

exports.becomeAprovider=async(req,res)=>{
try{
    const {name,contactNo,email,vatNo,panNo,location}=req.body
const customerId=req.user.id
if(!name||!contactNo||!email||!location){
    return res.status(404).json({
        message:"please provide name ,contactNo ,email,location"
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