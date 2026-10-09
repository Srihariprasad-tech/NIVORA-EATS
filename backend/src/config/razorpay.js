const Razorpay=require("razorpay");
const razorpay=new Razorpay({
    keyid:process.env.RAZORPAY_KEY_ID,
    keysecret:process.env.RAZORPAY_SECRET
});

module.exports=razorpay;