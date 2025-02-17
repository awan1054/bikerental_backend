const nodemailer=require("nodemailer")
// async function sendMail(email,otp)
async function sendMail(email,subject,message)
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
    subject,
    text:message,
})
}
module.exports=sendMail