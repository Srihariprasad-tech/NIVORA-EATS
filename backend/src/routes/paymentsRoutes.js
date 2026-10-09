const express=require("express");
const router=express.Router();
const pay=require("../controllers/paymentController");
const authmidd=require("../middleware/authmiddleware");

router.post("/createorder",authmidd,pay.payment);
router.post(
    "/verify",
    authmidd,
    pay.verifypayment
);
module.exports=router;