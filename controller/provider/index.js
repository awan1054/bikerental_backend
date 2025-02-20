const Bike = require("../../model/bikemodel")
const book = require("../../model/bookschema")
const Provider = require("../../model/providermodel")
const user = require("../../model/userModel")
const sendMail = require("../../Services/sendMail")

exports.becomeAprovider=async(req,res)=>{
try{
    const {name,contactNo,email,vatNo,panNo,location}=req.body
const customerId=req.user.id
if(!name||!contactNo||!email||!location){
    return res.status(404).json({
        message:"please provide Name ,ContactNo ,Email,Location"
    })
}

await Provider.create({
    name,
    contactNo,
    email,
    location,
    vatNo,
    panNo,
    customerId:customerId
})
 await sendMail(email, "Role Changed Notification", "Congratulations! Your role has been changed. You are now a provider.");
res.status(202).json({
    message:"Your form has been submitted, please wait for admin response"
})
}
catch (error) {
    res.status(404).json({

        message: "error xa",
        errmessage: error.message
    })

}
}

exports.changeProviderStatus=async(req,res)=>{
    const {status,providerId}=req.body
    const data=await Provider.findById(providerId)
    if(status=="active"){
await Provider.findByIdAndUpdate(providerId,{status:"active"})
await user.findByIdAndUpdate(data.customerId,{role:"provider"})
res.status(202).json({
    message:"Provider is active now"
})
    }
    else if(status=="inactive")
    {
        await Provider.findByIdAndUpdate(providerId,{status:"inactive"})
        res.status(202).json({
            message:"Provider is inactive now"
        })
    }
    else{
        res.status(400).json({
            message:"Invalid status"
        })
    }
}

exports.getAllusers=async(req,res)=>{
    const data=await user.find()
    res.status(200).json({
        message:"user fetched successfully",
        data:data
    })
}

exports.getAllBikesp=async(req,res)=>{
    console.log("triggered")
    const data=await Bike.find({
        customerId : req.user.id
    })
    
    res.status(202).json({
        message:"Bike fetched successfully",
        data:data
    })
}

exports.findBookedUser = async (req, res) => {
    console.log(req.user.id)
    try {
        const data = await book.find()
            .populate({
                path: "bike",
                match: { customerId: req.user.id } // Only fetch bikes where customerId matches req.user.id
            });

        // Remove bookings where bike is null (means no match was found in populate)
        const filteredData = data.filter(booking => booking.bike !== null);

        res.status(202).json({
            message: "Booked users fetched successfully",
            data: filteredData
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching booked users", error: error.message });
    }
};


exports.getbookeduser=async (req,res)=>{
    const id=req.params.id
    const data= await book.findById(id)
    res.status(200).json({
        message:"Booked user fetched successfully",

        data:data
    })
}

exports.deleteBookeduser=async (req,res)=>{
    const id=req.params.id
    const data= await book.findByIdAndDelete(id)
    res.status(200).json({
        message:"booked users  deleted successfully",

        data:data
    })
}