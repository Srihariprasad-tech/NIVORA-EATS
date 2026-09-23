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

//patch the cart //
const patch=async(req,res,next)=>
{
    try{
    const userid=req.user.userid;
    const foodid=req.params.id;
    const quantity=req.body.quantity;
    const updatecart=await cartserv.updca(userid,foodid,quantity);
    res.json({
        success:true,
        message:"cart updated successfully",
        updatecart
    });
    }
    catch(error)
    {
        next(error);
    }
}

//delete the cart//
const de=async(req,res,next)=>
{
try
{
    const id=req.params.id;
    const userid=req.user.userid;
    const todelete=await cartserv.delcart(id,userid);
    res.json({
        success:true,
        message:"food item from cart is deleted succesfully",
        todelete
    });
}
catch(error)
{
    next(error);
}
}

// delete the eniter cart //

const remove=async(req,res,next)=>
{
    try{
    const userid=req.user.userid;
    const rem=await cartserv.remcart(userid);
    res.json({
        success:true,
        message:"cart removed succesfully",
        rem
        });
    }
    catch(error)
    {
        next(error);
    }
}

module.exports={
    add,
    allcart,
    patch,
    de,
    remove
}