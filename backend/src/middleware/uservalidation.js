const Joi = require("joi");
const joi=require("joi");
const userschema=Joi.object({
    name:Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required(),

email:Joi.string()
.trim()
.lowercase()
.required(),

password:Joi.string()
.min(8)
.max(100)
.required(),

phone:Joi.string()
.trim()
.min(10)
.max(15)
.required()
});

const validateuser=(req,res,next)=>
{
   const {error}=userschema.validate(req.body);
   if(error)
   {
    return res.status(400).json({
        success:false,
        message:error.details[0].message
    });
   }
   next();
};


module.exports=validateuser;