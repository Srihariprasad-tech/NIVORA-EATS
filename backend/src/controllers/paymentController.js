const paymentmodel=require("../services/paymentService");

const payment=async(req,res,next)=>
{
    const userid=req.user.userid;
    try{
    const pay=await paymentmodel.createpaymentorder(userid);
    res.json({
        message:"done",
        pay
    });
}
catch(error)
{
next(error);
}
}
// verfiy payment //
const verifypayment = async (req, res, next) => {

    try {
       const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;
         const userid = req.user.userid;

        const paymentdata = await paymentmodel.verifypayment(
            userid,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        );

        res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            payment: paymentdata
        });

    } catch (error) {

        next(error);

    }
};
module.exports={
    payment,
    verifypayment
};