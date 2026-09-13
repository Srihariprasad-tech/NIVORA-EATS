const express=require("express");
const router=express.Router();
const createuser=require("../controllers/usercontroller");
const auth=require("../middleware/authmiddleware");
const allowroles=require("../middleware/rolemiddleware");

router.get("/",createuser.read);
router.get("/profile",auth,createuser.profile);

router.get("/admin-test",auth,allowroles("admin"),(req,res)=>
{
    res.status(200).json({
        success:true,
        message:"welcome admin"
    });
});


router.get("/:id",createuser.one);
router.patch("/:id",createuser.update);
router.delete("/:id",createuser.del);
module.exports=router;