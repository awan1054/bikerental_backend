const Bike = require("../../model/bikemodel")

exports.addBike=async(req,res)=>{
    const{name,brand,price,description,category}=req.body
    if(!name||!brand||!price||!description||!category){
        return res.status(404).json({
            message:"Please provide name,brand,price,catrgory,description"
        })
    }
    await Bike.create({
        name,
        brand,
        description,
        category,
        price
    })
    res.status(404).json({
        message:"Bike added successfully"
    })
}
exports.getALLBikes=async(req,res)=>{
    const data=await Bike.find()
    res.status(200).json({
        message:"bike fetched successfully",
        data:data
    })
}
exports.getBike=async (req,res)=>{
    const id=req.params.id
    const data= await Bike.FindBYId(id)
    res.status(200).json({
        message:"Bike fetched successfully",

        data:data
    })

}
exports.getBike=async (req,res)=>{
    const id=req.params.id
    const data= await Bike.findById(id)
    res.status(200).json({
        message:"Bike fetched successfully",

        data:data
    })
}
exports.deleteBike=async (req,res)=>{
    const id=req.params.id
    const data= await Bike.findByIdAndDelete(id)
    res.status(200).json({
        message:"Bike deleted successfully",

        data:data
    })
}

exports.updateBike=async (req,res)=>{
    const id=req.params.id
    const{name,description,brand,price,cateory}=req.body
    await Bike.findByIdAndUpdate(id,{
        name,
        price,
        description,
        brand,cateory
    })
    res.status(200).json({
        message:"Bike upadated successfully"
    })
}