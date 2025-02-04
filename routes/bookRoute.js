const express=require("express")
const {multer,Storage}=require("./../Services/multerConfig")
const upload=multer({storage:Storage})
const checkidLoginOrNot = require("../middleware/checkidLoginOrNot")
const accessTo = require("../middleware/accessTo")
const { bookNow, findBook, getbookuser, deleteBookuser } = require("../controller/book")
const router=express.Router()
// router.route("/book").post(checkidLoginOrNot,accessTo("customer"),upload.single("citizenship"),bookNow)
router.route("/book").post(
    checkidLoginOrNot,
    accessTo("customer"),
    upload.fields([
      { name: "citizenship", maxCount: 1 },
      { name: "licence", maxCount: 1 }
    ]),
    bookNow
  )
  router.route("/buser").get(findBook)
  router.route("/getsinglebook/:id").get(getbookuser)
  router.route("/deletebookuser/:id").delete(deleteBookuser)
module.exports=router