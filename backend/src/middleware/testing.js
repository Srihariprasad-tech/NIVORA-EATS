const middleware=(req,res,next)=>
{
    console.log("middleware is worked properly ");
    next();
}
module.exports=middleware;