const { becomeAprovider, changeProviderStatus } = require("../controller/provider")
const accessTo = require("../middleware/accessTo")
const checkidLoginOrNot = require("../middleware/checkidLoginOrNot")

const express=require("express")
const router=express.Router()
router.route("/become").post(checkidLoginOrNot,accessTo("customer"),becomeAprovider)
router.route("/change-status").patch(checkidLoginOrNot,accessTo("admin"),changeProviderStatus)
module.exports=router