const food=require("../models/food");

//createfood
const createfood=async(data,userid)=>
{
    const foodData={
        ...data,
        cook:userid
    };
 const data2 = await food.create(foodData);
    return data2;
}

// getallfood//

const getall=async()=>
{
    const allfo=await food.find();
    return allfo;
}


//getfoodbyid

const idd=async(data)=>
{
    const fod=await food.findById(data);
    return fod;
}

//updatethefood//
const patchfood=async(id,data)=>
{
const done=await food.findByIdAndUpdate(id,data,
{
    new:true
});
}

//deletethefood//
const deletefood=async(data)=>
{
    const del=food.findByIdAndDelete(data);
    return del;
}
module.exports={
    createfood,
    getall,
    idd,
    patchfood,
    deletefood
}
