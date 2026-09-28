const checkoutser=require("../services/checkoutService");

const getcheck=async(req,res,next)=>
{
    try{
const userid=req.user.userid;
const totalcartval=await checkoutser.getcart(userid);
res.json({
    success:true,
    message:"done",
    totalcartval
});
    }
    catch(error)
    {
     next(error);
    }
}
module.exports={
    getcheck
}