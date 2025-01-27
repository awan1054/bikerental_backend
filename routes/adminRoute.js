const express=require("express")
const { getAlluser, deleteUser, getAllProviderlist, deleteProvider, getAllBikes, deleteBikes } = require("../controller/admin/admincontroller")
const accessTo = require("../middleware/accessTo")
const checkidLoginOrNot = require("../middleware/checkidLoginOrNot")
const { deleteBike } = require("../controller/bike")
const router=express.Router()
router.route("/user").get(checkidLoginOrNot,accessTo("admin"),getAlluser)
router.route("/user/:id").delete(checkidLoginOrNot,accessTo("admin"),deleteUser)
router.route("/providers").get(checkidLoginOrNot,accessTo("admin"),getAllProviderlist)
router.route("/providers/:id").delete(checkidLoginOrNot,accessTo("admin"),deleteProvider)
router.route("/bikes").get(checkidLoginOrNot,accessTo("admin"),getAllBikes)
router.route("/bikes/:id").delete(checkidLoginOrNot,accessTo("admin"),deleteBikes)


module.exports=router