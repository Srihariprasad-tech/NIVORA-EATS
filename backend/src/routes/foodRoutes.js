const express=require("express");
const router=express.Router();
const food=require("../controllers/foodcontroller");
const authmidd=require("../middleware/authmiddleware");

router.post("/",authmidd,food.create);
router.get("/all",food.getall);
router.get("/:id",food.id);
router.patch("/:id",food.patch);
router.delete("/:id",food.deletee);
module.exports=router;