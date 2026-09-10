const test=require("../models/testmodel");
const createdata=async(data)=>
{
    const newtest=await test.create(data);
    return newtest;
}

const readdata=async()=>
{
    const alldata=await test.find();
    return alldata;
};

const onedata=async(data)=>
{
    const mem=await test.findById(data);
    return mem;
}

const updatedata=async(id,data)=>
{
    const updated=await test.findByIdAndUpdate(
        id,
        data,
        {
            new :true
        }
    );
    return updated;
}

const deleteone=async(data)=>
{
    const remove=await test.findByIdAndDelete(data);
    return remove;
}



module.exports={
    createdata,
    readdata,
    onedata,
    updatedata,
    deleteone
};