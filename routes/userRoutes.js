const express=require("express")
const { registeruser, loginuser, forgotPassword, resetPassword } = require("../controller/authentication")
const router=express.Router()

router.route("/register").post(registeruser)
router.route("/login").post(loginuser)
router.route("/forgot_password").post(forgotPassword)
router.route("/reset_password").post(resetPassword)

module.exports=router