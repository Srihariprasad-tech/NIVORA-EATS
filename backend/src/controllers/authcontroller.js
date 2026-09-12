const newuser=require("../models/user");
const authservices=require("../services/authservices");

const mem=async(req,res,next)=>
{
    try
    {
        const result=await authservices.auth(req.body);
        const user=result.toObject();
        delete user.password;
       res.status(200).json({
        message:"new user register succesfully",
        result:user
       });
    }
    catch(error)
    {
        next(error);
    }
}
module.exports={
    mem
};