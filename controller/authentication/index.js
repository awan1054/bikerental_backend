const user=require("../../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const generateOtp = require("../../Services/generateOtp")
const sendMail = require("../../Services/sendMail")


exports.registeruser = async (req, res) => {
    try {

        const { username, email, password } = req.body
        if (!username || !email || !password) {
            res.status(400).json({
                message: "please provide info"
            })
            return
        }

        await user.create({
            username,
            email,
            password: bcrypt.hashSync(password, 12)
        })
        res.status(201).json({
            message: "user registered successfully"
        })

    }
    catch (error) {
        res.status(500).json({
            message: "error",
            errmessage: error.message
        })

    }

}

exports.loginuser = async (req, res) => {

    try {

        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).json({
                message: "plese provide email pass"
            })
            return
        }

        //check email
        const data = await user.find({ email: email }) //select * from user where email
        console.log(data)

        /* 
        user with that email vetana vane --> [] auxa
        vetyo vane chai - data auxa
        */
        if (data.length === 0) {
            res.status(404).json({
                message: "no user with the email"
            })
        }
        else {

            //password check
            const isPasswordMatched = bcrypt.compareSync(password, data[0].password)     //return boolean
            if (isPasswordMatched) {


                var token = jwt.sign({
                    id: data[0]._id
                }, process.env.Secret_key,

                    {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    })


                res.status(200).json({

                    message: "loggedin success",
                    token:token
                })

            }
            else {
                res.status(404).json({
                    message: "invalid password"
                })
            }
        }

    } catch (error) {
        res.status(404).json({

            message: "error xa",
            errmessage: error.message
        })

    }
}


exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body

        var data = await user.find({ email: email })
        if (data.length === 0) {
            return res.status(404).json({
                message: "no user register with this email"
            })
        }
        if (!email) {
            res.status(400).json({
                message: " plese peovid email"
            })
            return
        }

        var otp = generateOtp()
        data[0].otp = otp
        await data[0].save()

        await sendMail(email, otp)
        res.status(200).json
            ({
                message: "otp send success"
            })
    }

    catch (error) {
        res.status(500).json({
            message: "error",
            errormessage: error.message
        })
    }
}

exports.resetPassword =async (req,res)=>{
    try{
        const {otp,newPassword} = req.body
    if(!otp || !newPassword){
        return res.status(400).json({
            message : "please provide otp,newpassword"
        })
    }

    //otp verify, whwether yo otp xa ki xaina

    const [data] = await user.find({otp : otp})  //data first array ma xa [data destructuring ]
    if(!data){
        return res.status(404).json({
            message : "invlid otp"
        })
    }
    data.password = bcrypt.hashSync(newPassword,10)
    await data.save()
    res.status(200).json({
        message : "password reset successfully"
    })
    }
    catch(error)
    {
        res.ststus(500).json({

            message : "Error",
            errormessage : error.message
        })
    }
}