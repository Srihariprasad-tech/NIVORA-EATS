const user=require("../models/user");
// create
const userval=async(data)=>
{
    const dataval=await user.create(data);
    return dataval;
}

//read
const getusers=async()=>
{
    const all=await user.find();
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
    userval,
    getusers,
    onemem,
    newguy,
    delguy
};