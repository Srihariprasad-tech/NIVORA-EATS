const user=require("../models/user");
const bcrypt=require("bcrypt");


//read
const getusers=async()=>
{
    const all=await user.find().select("-password");
    return all;
}


//readone//

const onemem=async(data)=>
{
    const on=await user.findById(data);
    return on;
}





//update//
const newguy=async(id,data)=>
{
    const up=await user.findByIdAndUpdate(id,data,
        {
            new:true,
        }
    )
    return up;
} 


//delete//
const delguy=async(data)=>
{
    const de=await user.findByIdAndDelete(data);
    return de
}


module.exports={
    getusers,
    onemem,
    newguy,
    delguy

};