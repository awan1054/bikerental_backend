const accessTo=(role)=>{
return(req,res,next)=>{
    const incomingUserrole=req.user.role
if(incomingUserrole !=role){
    res.status(403).json({
        message:"You dont have access to do it !!"
    })
}
else{
    next()
}
}

}
module.exports=accessTo