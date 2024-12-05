const Provider = require("../../model/providermodel")
const user = require("../../model/userModel")

exports.getAlluser=async(req,res)=>{
    const data=await user.find()
    res.status(200).json({
        message:"user fetched successfully",
        data:data
    })
}
exports.deleteUser=async(req,res)=>{
    const id=req.params.id
    await user.findByIdAndDelete(id)
    res.status(200).json({
        message:"user deleted successfully"
    })
}

exports.getAllProviderlist=async(req,res)=>{
    const data=await Provider.find()
    res.status(202).json({
        message:"Providers fetched successfully",
        data
    })
}