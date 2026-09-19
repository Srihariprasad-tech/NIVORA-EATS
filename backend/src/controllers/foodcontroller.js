const foodservices=require("../services/foodservices.js");

//create food model//
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

//get all food //
const getall=async(req,res,next)=>
{
    try{
        const foods=await foodservices.getall();
        res.json({
            message:"all foods ",
            foods
        })
    }
    catch(error)
    {
        next(error);
    }
}
//get food by id//
const id=async(req,res,next)=>
{
    try{
       const getid=await foodservices.idd(req.params.id);
       res.json({
        message:"food by id",
        getid
       });
    }
    catch(error)
    {
        next(error);
    }
}
//patch food//
const patch=async(req,res,next)=>
{
    try{
        const id=req.params.id;
        const userId=req.user.userid;
        const data=req.body;
  console.log("FOOD ID:", id);
        console.log("USER ID:", userId);
        console.log("DATA:", data);
        const updatedfood=await foodservices.patchfood(id,userId,data);
        res.json({
            message:"food updated",
            updatedfood
        })
    }
    catch(error)
    {
        next(error);
    }
}

//deletefood//
const deletee=async(req,res,next)=>
{
try{
    const id=req.params.id;
    const userId=req.user
    const delfood=await foodservices.deletefood(id,userId);
    res.json({
        message:"food deleted",
    });
}
catch(error)
{
    next(error);
}
}

//getmyfood//
const myfood=async(req,res,next)=>
{
    try{
        const foodid=req.user.userid;
        const fd=await foodservices.myfoods(foodid);
        res.json({
            message:"my foods of the user",
            fd
        });
    }
    catch(error)
    {
        next(error);
    }
}

//update availibiltiy//
const ava=async(req,res,next)=>
{
    try{
        const id=req.params.id;
        const foodid=req.user.userid;
        const data=req.body;
        const up=await foodservices.upda(id,foodid,data);
        res.json({
            success:true,
            message:"avalibilty is updated",
            up
        });
    }
    catch(error)
    {
        next(error);
    }
}

// cook data by id//
const cooks=async(req,res,next)=>
{
    try{
        const id=req.params.id;
        console.log(id);
        const ck=await foodservices.ckk(id);
        res.json({
            success:true,
            message:"the foods of the user is",
            ck,
        });
    }
    catch(error)
    {
next(error);
    }
}





module.exports={
    create,
    getall,
    id,
    patch,
    deletee,
    myfood,
    ava,
    cooks
}