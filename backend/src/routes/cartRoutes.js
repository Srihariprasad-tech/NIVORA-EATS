const express=require("express");
const router=express.Router();
const authmidd=require("../middleware/authmiddleware");
const cartcont=require("../controllers/cartController");

router.post("/",authmidd,cartcont.add);
router.get("/all",authmidd,cartcont.allcart);
module.exports=router;