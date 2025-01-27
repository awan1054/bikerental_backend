const book = require("../../model/bookschema")

exports.bookNow=async(req,res)=>{
    const{Name,bike,email,contactNumber,location,licence,citizenship}=req.body
    const customerId=req.user.id
    if(!email||!location||!contactNumber||!citizenship||!licence){
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
        licence,
        citizenship,
        Name
      
    })
    res.status(200).json({
        message:"Booked successfully"
    })
}