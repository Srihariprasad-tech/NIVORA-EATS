const express=require("express");
const middleware = require("../middleware/testing");
const router=express.Router();

router.get("/",(req,res)=>
{
    res.send("this is menu page");
})
router.get("/south",(req,res)=>
{
    res.send("south indian food");
});
router.get("/north/:id",(req,res)=>
{
    res.send(`north indian food is ready with id no ${req.params.id}`);
});


module.exports=router;