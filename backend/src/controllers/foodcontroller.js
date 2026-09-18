const foodservices=require("../services/foodservices.js");

const create=async(req,res,next)=>
{
    try{
        console.log("USER:", req.user);
const data=await foodservices.createfood(
    req.body,
    req.user.userid
);
res.json({
    message:"food created succesfully",
    success:true,
    food:data
});
    }catch(error)
    {
        next(error);
    }
}

module.exports={
    create
}