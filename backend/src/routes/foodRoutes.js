const express=require("express");
const router=express.Router();
const food=require("../controllers/foodcontroller");
const authmidd=require("../middleware/authmiddleware");

router.post("/",authmidd,food.create);
router.get("/all",food.getall);
router.get("/myfoods",authmidd,food.myfood);
router.get("/:id",food.id);
router.patch("/:id",authmidd,food.patch);
router.patch("/:id/avaliablity",authmidd,food.ava);
router.delete("/:id",authmidd,food.deletee);
router.get("/:id",food.cooks);
module.exports=router;