const user = require("../../model/userModel")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const sendMail = require("../../Services/sendMail")

exports.registeruser=async(req,res)=>{
   try{
    const {username,email,password}=req.body
    if(!username||!email||!password){
        res.status(400).json({
            message:"please provide username,email,password"
    
        })
        return 
    }
    await user.create({
        username,
        email,
        password:bcrypt.hashSync(password,12)
    })
    res.status(201).json({
        message:"user registered successfully"
    })
   }
   catch(e){
    res.status(500).json({
        message:"Error",
        errMessage:e.message
        
    })
   }
    }
    

    exports.loginuser=async(req,res)=>{
       try{
        const{email,password}=req.body
        if(!email||!password){
            res.status(400).json({
                message:"Please provide email and password"
            })
            return
        }
        
        //check email
       const data=await user.find({email:email})//find return array

     if(data.length===0)
     {
        res.status(404).json({
            message:"No user with that email"
        })
     }
     else{
        const isPasswordMatched=bcrypt.compareSync(password,data[0].password)//return boolean
        if(isPasswordMatched)
        {
           var token = jwt.sign({id:data[0]._id},process.env.Secret_key,{
                expiresIn:process.env.JWT_EXPIRES_IN
            })
            res.status(200).json({
                message:"Logged successfully",
                token:token
            })
        }
        else{
            res.status(400).json({
                message:"Invalid password"
            })
        }
        
     }
       }
       catch(error){
        res.status(500).json({
            message:"Error",
            errMessage:error.message
        })
       }
    }
    exports.forgotPassword=async(req,res)=>{
        const {email}=req.body
        if(!email){
            res.status(400).json({
                message:"Please provide email"
            })
        
        return
        }
        var otp=1234
       await sendMail(email,otp)
        res.status(200).json({
            message:"OTP sent successfully"
        })
    }
