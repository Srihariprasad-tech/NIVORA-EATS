const express=require("express");
const router=express.Router();
const validate=require("../middleware/uservalidation");
const authcont=require("../controllers/authcontroller");

router.post("/",validate,authcont.mem);

module.exports=router;