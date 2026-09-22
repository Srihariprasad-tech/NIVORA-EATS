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

//get all cart //
const allcart=async(req,res,next)=>
{
    try{
        const userid=req.user.userid;
        const carts=await cartserv.getcarts(userid);
        res.json({
            success:true,
            message:"all carts displayed",
            carts
        });
    }
    catch(error)
    {
        next(error);
    }
}


module.exports={
    add,
    allcart
}