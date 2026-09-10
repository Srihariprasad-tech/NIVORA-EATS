const test = require("../models/testmodel");
const testservice=require("../services/testservices");
const createtest=async(req,res,next)=>
{
    try{
        const result= await testservice.createdata(req.body);
        res.status(201).json({
            success:true,
            message:"test item created succesfully",
            data:result
        });
    }
    catch(error)
    {
    next(error);
        }
    };
const members=async(req,res)=>
{
const result= await testservice.readdata();
res.json(result);
}

const person=async(req,res)=>
{
    const id= await testservice.onedata(req.params.id);
    res.json(id);
}


const update= async(req,res)=>
{
    try{
        const id=req.params.id;
        const data=req.body;
        const result=await testservice.updatedata(id,data);
        res.status(200).json(result);
    }
    catch(error)
    {
        res.status(500).json({
            message:error.message
        });
    }
};


const deletemem=async(req,res)=>
{
    const done=await testservice.deleteone(req.params.id);
res.json({
    message:"user deleted succesfully"
});
}



module.exports={
    createtest,
    members,
    person,
    update,
    deletemem
};


