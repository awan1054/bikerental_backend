const jwt=require("jsonwebtoken")
const user = require("../model/userModel")
const checkidLoginOrNot=(req,res)=>{
const token=req.headers.authorization
if(!token){
    return res.status(403).json({
        message:"please provide token"
    })
}
jwt.verify(token,process.env.Secret_key,async(err,result)=>{
    if(err){
        res.status.json({
            message:err
        })
    }
    else{
        console.log(result)
        //check whether result ko id ko user xxa ki nai
        const data= await user.findById(result.id)
        if(!data){
            res.status(404).json({
message:"no user with that id"
            })
        }


    }
})
}
module.exports=checkidLoginOrNot