const express=require("express");
const router=express.Router();
const checkoutcont=require("../controllers/checkoutController");
const authmidd=require("../middleware/authmiddleware");
router.get("/",authmidd,checkoutcont.getcheck);

module.exports=router;