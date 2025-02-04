const book = require("../../model/bookschema")

exports.bookNow=async(req,res)=>{
    const{Name,bike,email,contactNumber,location,licence,citizenship}=req.body
    const customerId=req.user.id
    const licenceFile = req.files.licence ? req.files.licence[0].filename : null;
    const citizenshipFile = req.files.citizenship ? req.files.citizenship[0].filename : null;

 
    if(!email||!location||!contactNumber){
        return res.status(404).json({
            message:"Please provide email,location,citizenship,licence,contact"
        })
    }
    await book.create({
        
        user:customerId,
        bike,
        email,
        contactNumber,
        location,
        licence:licenceFile,
        citizenship:citizenshipFile,
        Name
      
    })
    res.status(200).json({
        message:"Booked successfully"
    })
}

exports.findBook=async(req,res)=>{
    const data=await book.find()
    res.status(202).json({
        message:"booked users fetcched successfully",
        data:data
    })
}


exports.getbookuser=async (req,res)=>{
    const id=req.params.id
    const data= await book.findById(id)
    res.status(200).json({
        message:"Booked user fetched successfully",

        data:data
    })
}

exports.deleteBookuser=async (req,res)=>{
    const id=req.params.id
    const data= await book.findByIdAndDelete(id)
    res.status(200).json({
        message:"booked users  deleted successfully",

        data:data
    })
}