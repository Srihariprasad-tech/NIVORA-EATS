const express=require("express");
const router=express.Router();

const testcontroller=require("../controllers/testcontrollers");
router.post("/",testcontroller.createtest);
router.get("/",testcontroller.members);
router.get("/:id",testcontroller.person);
router.put("/:id",testcontroller.update);
router.delete("/:id",testcontroller.deletemem);                                      
module.exports=router;