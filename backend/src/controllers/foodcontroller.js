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
        const data=req.body;
        const updatedfood=await foodservices.patchfood(id,data);
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
    const delfood=await foodservices.deletefood(id);
    res.json({
        message:"food deleted",
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
    deletee
}