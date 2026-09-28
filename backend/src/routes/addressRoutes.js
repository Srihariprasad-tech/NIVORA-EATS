const express=require("express");
const router=express.Router();
const addresscont=require("../controllers/addressController");
const authmidd=require("../middleware/authmiddleware");

router.post("/create",authmidd,addresscont.createadd);
router.get("/:id",authmidd,addresscont.getid);
router.get("/",authmidd,addresscont.getadd);
router.patch("/:id",authmidd,addresscont.updateadd);
router.delete("/:id",authmidd,addresscont.deleteaddress);
router.patch("/:id/default",authmidd,addresscont.setDefault);
module.exports=router;