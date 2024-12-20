const express=require("express")
const { getAlluser, deleteUser, getAllProviderlist } = require("../controller/admin/admincontroller")
const accessTo = require("../middleware/accessTo")
const checkidLoginOrNot = require("../middleware/checkidLoginOrNot")
const router=express.Router()
router.route("/user").get(checkidLoginOrNot,accessTo("admin"),getAlluser)
router.route("user/:id").delete(checkidLoginOrNot,accessTo("admin"),deleteUser)
router.route("/providers").get(checkidLoginOrNot,accessTo("admin"),getAllProviderlist)
module.exports=router