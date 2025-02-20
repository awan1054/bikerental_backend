const Bike = require("../../model/bikemodel")

// exports.addBike=async(req,res)=>{
//     const{name,brand,price,description,category,image}=req.body
    
//     const imageFile = req.file ? req.file.filename : null;

//     // if(!req.file){
//     //     filename="https://www.google.com/url?sa=i&url=https%3A%2F%2Fphotogallery.indiatimes.com%2Fsports%2Fother-sports%2Ftop-15-sports-bikes-in-india%2Farticleshow%2F80452543.cms&psig=AOvVaw1QMNYe7bMgtXIj1S-_TmLm&ust=1732774148395000&source=images&cd=vfe&opi=89978449&ved=0CBQQjhxqFwoTCJjl2-7s-4kDFQAAAAAdAAAAABAE"
//     // }
//     // else{
//     //     filename=req.file.filename
//     // }
//     if(!name||!brand||!price||!description||!category){
//         return res.status(404).json({
//             message:"Please provide name,brand,price,catrgory,description"
//         })
//     }
//     await Bike.create({
//         name,
//         brand,
//         description,
//         category,
//         price,
//         image:imageFile,
//         customerId:req.user.id
//     })
//     res.status(404).json({
//         message:"Bike added successfully"
//     })
// }
exports.addBike = async (req, res) => {
    try {
        const { name, brand, price, description, category } = req.body;
        
        // Ensure that req.file is correctly accessed
        const imageFile = req.file ? req.file.filename : null;

        if (!name || !brand || !price || !description || !category) {
            return res.status(400).json({
                message: "Please provide name, brand, price, category, and description."
            });
        }

        const bike = await Bike.create({
            name,
            brand,
            description,
            category,
            price,
            image: imageFile,
            customerId: req.user.id
        });

        return res.status(201).json({
            message: "Bike added successfully",
            bike
        });

    } catch (error) {
        console.error("Error adding bike:", error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

exports.getALLBikes=async(req,res)=>{
    const data=await Bike.find()
    res.status(200).json({
        message:"bike fetched successfully",
        data:data
    })
}
// exports.getBike=async (req,res)=>{
//     const id=req.params.id
//     const data= await Bike.FindBYId(id)
//     res.status(200).json({
//         message:"Bike fetched successfully",

//         data:data
//     })

// }
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