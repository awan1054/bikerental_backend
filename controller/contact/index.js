
const contact = require("../../model/contactmodel")

exports.contactus=async(req,res)=>{
    const{name,email,message}=req.body
   
    if(!email||!name||!message){
        return res.status(404).json({
            message:"Please provide email,message"
        })
    }
    await contact.create({  
        email,
        name,
        message,  
    })
    res.status(200).json({
        message:"Message submitted successfully"
    })
}
