const user = require("../../model/userModel")
const bcrypt=require("bcryptjs")

exports.registeruser=async(req,res)=>{
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
    

    exports.loginuser=async(req,res)=>{
        const{email,password}=req.body
        if(!email||!password){
            res.status(400).json({
                message:"Please provide email and password"
            })
            return
        }
        //check email
       const data=await user.find({email:email})

       console.log(data)
    }
