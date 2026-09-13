const allowroute=(...allowedroles)=>
{
    return (req,res,next)=>
    {
        if(!req.user)
        {
            return res.status(401).json({
                success:false,
                message:"user not authenticated"
            });
        }
        if(!allowedroles.includes(req.user.role))
        {
            return res.status(403).json({
                success:false,
                message:"access denied"
            });
        }
        next();
    };
};

module.exports=allowroute;