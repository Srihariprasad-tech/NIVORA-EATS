const jwt=require("jsonwebtoken");
const authmiddleware=(req,res,next)=>
{
    try{
        const authheader=req.headers.authorization;
        if(!authheader)
        {
            return res.status(401).json({
                success:false,
                message:"authorization header was missing"
            });
        }
        const token=authheader.split(" ")[1];
        if(!token)
        {
            return res.status(401).json({
                success:false,
                message:"token is missing"
            });
        }
        const decoded=jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user=decoded;
        next();
    }
    catch(error)
    {
        return res.status(401).json({
            success:false,
            message:"invlaid or expired token"
        });
    }
};
module.exports=authmiddleware;