const expres=require("express");
const testing=require("../middleware/testing");
const router=expres.Router();

router.get("/s",testing,(req,res,next)=>
{
    res.json({
        message:"done you are processsed"
    });
});
module.exports=router;