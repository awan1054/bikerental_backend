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