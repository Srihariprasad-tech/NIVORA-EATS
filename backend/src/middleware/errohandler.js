 const errohandler=(err,req,res,next)=>
 {
    console.log("error middleware recived",err.message);
    res.status(500).json({
        success:false,
        message:err.message
    });
 }
 module.exports=errohandler;