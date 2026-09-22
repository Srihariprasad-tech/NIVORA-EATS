const express=require("express");
const router=express.Router();
const authmidd=require("../middleware/authmiddleware");
const cartcont=require("../controllers/cartController");

router.post("/",authmidd,cartcont.add);

module.exports=router;