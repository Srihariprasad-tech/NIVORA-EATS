const newuser=require("../models/user");
const bcrypt=require("bcrypt");


//register userr//
const auth=async(data)=>
{
    const hashedpassword=await bcrypt.hash(data.password,10);
    const newmm=await newuser.create({

    ...data,
    password:hashedpassword
});
return newmm;
}
//login route//
const login=async(data)=>
{
    const existinguser=await newuser.findOne({
        email:data.email
    })
    .select("+password");


if(!existinguser)
{
    throw new Error("invalid email or password");
}
const ismatch=await bcrypt.compare(
    data.password,
    existinguser.password
);
if(!ismatch)
{
    throw new Error("invalid email or password");
}
return existinguser;
};

module.exports={
    auth,
    login
};