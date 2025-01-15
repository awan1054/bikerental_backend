const jwt=require("jsonwebtoken")
const user = require("../model/userModel")
const checkidLoginOrNot=(req,res,next)=>{
const token=req.headers.authorization
if(!token){
    return res.status(403).json({
        message:"please provide token"
    })
}
jwt.verify(token,process.env.Secret_key,async(err,result)=>{
    if(err){
        res.status(500).json({
            message:err
        })
    }
    else{
        console.log(result)
        //check whether result ko id ko user xxa ki nai
        const data= await user.findById(result.id)
        if(!data){
          return  res.status(404).json({
                  message:"No user with that id"
            })
        }
else{
    req.user=data
    next()
}

    }
})
}
module.exports=checkidLoginOrNot