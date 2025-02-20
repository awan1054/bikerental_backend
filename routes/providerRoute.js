const { becomeAprovider, changeProviderStatus, getbookeduser, deleteBookeduser, findBookeduser, getAllBikes, getAllBikesp, getAllusers, findBookedUser } = require("../controller/provider")
const accessTo = require("../middleware/accessTo")
const checkidLoginOrNot = require("../middleware/checkidLoginOrNot")

const express=require("express")
const router=express.Router()
router.route("/become").post(checkidLoginOrNot,accessTo("customer"),becomeAprovider)
router.route("/change-status").patch(checkidLoginOrNot,accessTo("admin"),changeProviderStatus)
router.route("/bikes").get(checkidLoginOrNot,accessTo("provider"),getAllBikesp)
router.route("/users").get(checkidLoginOrNot,accessTo("provider"),getAllusers)
router.route("/bookeduser").get(checkidLoginOrNot,accessTo("provider"), findBookedUser)
  router.route("/getsinglebookeduser/:id").get(getbookeduser)
  router.route("/deletebookeduser/:id").delete(deleteBookeduser)
module.exports=router