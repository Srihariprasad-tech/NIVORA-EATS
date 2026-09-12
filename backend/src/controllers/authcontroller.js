const authservices=require("../services/authservices");

// register route//
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

//login route//
const login=async(req,res,next)=>
{
    try{
        const result=await authservices.login(req.body);
        const user=result.user.toObject();
        delete user.password;
        res.status(200).json({
            message:"login successful",
            token:result.token,
            user
        });
    }
    catch(error)
    {
        next(error);
    }
}


module.exports={
    mem,
    login
};