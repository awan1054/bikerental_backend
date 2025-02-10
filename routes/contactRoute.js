const express=require("express")
const checkidLoginOrNot = require("../middleware/checkidLoginOrNot")
const accessTo = require("../middleware/accessTo")
const { contactus } = require("../controller/contact")
const router=express.Router()
router.route("/contactus").post(
    checkidLoginOrNot,
    accessTo("customer"),
    contactus
  )
module.exports=router