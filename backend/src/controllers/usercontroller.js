const user=require("../models/user");
const userservices=require("../services/userservices");

// get request//
const read=async(req,res,next)=>
{
    try{
    const result=await userservices.getusers();
    res.json({
        result
    });
}
catch(error)
{
    next(error);
}
}


//get one document//
const one=async(req,res,next)=>
{
    try
    {
        const result=await userservices.onemem(req.params.id);
        res.json({
            result
        });
    }
    catch(error)
    {
        next(error);
    }
}

//update//
const update=async(req,res,next)=>
{
    try{
    const id=req.params.id;
    const data=req.body;
    const result=await userservices.newguy(id,data);
    res.json({
        result
    })
}
    catch(error)
    {
        next(error);
    }

}

//delete
const del=async(req,res,next)=>
{
    try{
        const result=await userservices.delguy(req.params.id);
        res.json({
            result
        });
    }
    catch(error)
    {
        next(error);
    }
}






module.exports={
    createuser,
    read,
    one,
    update,
    del
}
