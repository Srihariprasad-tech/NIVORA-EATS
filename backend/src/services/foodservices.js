const food=require("../models/food");

const createfood=async(data,userid)=>
{
    const foodData={
        ...data,
        cook:userid
    };
 const data2 = await food.create(foodData);
    return data2;
}
module.exports={
    createfood
}