const nodemailer=require("nodemailer")
async function sendMail(email,otp)
{
//first configure nodemailer with our configuration

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD//not password,its app password
    }

})
 await transporter.sendMail({
    to:email,
    subject:"Regarding forgot password",
    text:"Hello, your request otp is"+otp
})
}
module.exports=sendMail