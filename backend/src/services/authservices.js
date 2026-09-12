const newuser=require("../models/user");
const bcrypt=require("bcrypt");

const auth=async(data)=>
{
    const hashedpassword=await bcrypt.hash(data.password,10);
    const newmm=await newuser.create({

    ...data,
    password:hashedpassword
});
return newmm;
}

module.exports={
    auth
};