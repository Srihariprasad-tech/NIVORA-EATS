const express=require('express');
const router=express.Router();
const menucontroller=require("../controllers/menucontrollers");

router.get("/",menucontroller.getmenu);
module.exports=router;