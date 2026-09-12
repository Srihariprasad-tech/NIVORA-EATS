const express=require("express");
const router=express.Router();
const validate=require("../middleware/uservalidation");
const createuser=require("../controllers/usercontroller");

router.get("/",createuser.read);
router.get("/:id",createuser.one);
router.patch("/:id",createuser.update);
router.delete("/:id",createuser.del);
module.exports=router;