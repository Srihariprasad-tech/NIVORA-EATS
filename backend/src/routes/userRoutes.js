const express=require("express");
const router=express.Router();
const createuser=require("../controllers/usercontroller");
const auth=require("../middleware/authmiddleware");

router.get("/",createuser.read);
router.get("/profile",auth,createuser.profile);
router.get("/:id",createuser.one);
router.patch("/:id",createuser.update);
router.delete("/:id",createuser.del);
module.exports=router;