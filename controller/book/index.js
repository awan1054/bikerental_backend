const book = require("../../model/bookschema")
const axios=require("axios")
exports.bookNow=async(req,res)=>{
    const{Name,bike,email,contactNumber,location,licence,citizenship,paymentmethod,totalamount}=req.body
    const customerId=req.user.id
    const licenceFile = req.files.licence ? req.files.licence[0].filename : null;
    const citizenshipFile = req.files.citizenship ? req.files.citizenship[0].filename : null;

    
    if(!email||!location||!contactNumber){
        return res.status(404).json({
            message:"Please provide email,location,citizenship,licence,contact"
        })
    }
   const booked =  await book.create({

        user:customerId,
        bike,
        email,
        contactNumber,
        location,
        licence:licenceFile,
        citizenship:citizenshipFile,
        Name,
        paymentmethod,totalamount, 
        customerId

      
    })
    if (paymentmethod == "khalti"){
        // khalti logic
        
        const data = {
          return_url : "http://localhost:5173/", 
          website_url : "http://localhost:5173/", 
          amount : totalamount*100, 
          purchase_order_id : booked._id, 
          purchase_order_name : "order_" + booked._id
        }
       const response =  await axios.post("https://a.khalti.com/api/v2/epayment/initiate/",data,{
          headers : {
            Authorization : "Key b71142e3f4fd4da8acccd01c8975be38"
          }
        })
      const khaltiResponse = response.data 
    //   paymentData.pidx = khaltiResponse.pidx
    //   paymentData.save()
      return res.status(200).json({
        message : "Order created successfully", 
        url : khaltiResponse.payment_url, 
        pidx : khaltiResponse.pidx,  
        data

      })
      }
    res.status(200).json({
        message:"Booked successfully"
    })
}

exports.findBook=async(req,res)=>{
    const data=await book.find()
    res.status(202).json({
        message:"booked users fetcched successfully",
        data:data
    })
}

exports.bookedhistory=async(req,res)=>{
  console.log(req.user.id)
  const data=await book.find({customerId:req.user.id})
  console.log(data)
  res.status(202).json({
    message:"booked history fetched successfully",
    data:data
  })
}

exports.getbookuser=async (req,res)=>{
    const id=req.params.id
    const data= await book.findById(id)
    res.status(200).json({
        message:"Booked user fetched successfully",

        data:data
    })
}

exports.deleteBookuser=async (req,res)=>{
    const id=req.params.id
    const data= await book.findByIdAndDelete(id)
    res.status(200).json({
        message:"booked users  deleted successfully",

        data:data
    })
}