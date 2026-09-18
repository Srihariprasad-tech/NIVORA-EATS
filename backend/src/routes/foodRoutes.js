const express=require("express");
const router=express.Router();
const food=require("../controllers/foodcontroller");
const authmidd=require("../middleware/authmiddleware");

router.post("/",authmidd,food.create);

module.exports=router;