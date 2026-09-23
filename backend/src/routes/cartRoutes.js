const express=require("express");
const router=express.Router();
const authmidd=require("../middleware/authmiddleware");
const cartcont=require("../controllers/cartController");

router.post("/",authmidd,cartcont.add);
router.get("/all",authmidd,cartcont.allcart);
router.patch("/:id",authmidd,cartcont.patch);
router.delete("/delete/:id",authmidd,cartcont.de);
router.delete("/cartdelete",authmidd,cartcont.remove);
module.exports=router;