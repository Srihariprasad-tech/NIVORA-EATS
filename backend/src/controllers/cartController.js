const cartserv=require("../services/cartService");

// create a cart//

const add=async(req,res,next)=>
{
    try{
        const id=req.user.userid;
    const cartitem=await cartserv.cartfod(req.body,id);
    res.json({
        success:true,
        message:"cart created succesfully",
        cartitem
    });
    }
    catch(error)
    {
        next(error);
    }
}

module.exports={
    add
}