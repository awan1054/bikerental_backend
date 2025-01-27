const express=require("express")
const {multer,Storage}=require("./../Services/multerConfig")
const upload=multer({storage:Storage})
const checkidLoginOrNot = require("../middleware/checkidLoginOrNot")
const accessTo = require("../middleware/accessTo")
const { bookNow } = require("../controller/book")
const router=express.Router()
router.route("/book").post(checkidLoginOrNot,accessTo("customer"),upload.single("image"),bookNow)
module.exports=router