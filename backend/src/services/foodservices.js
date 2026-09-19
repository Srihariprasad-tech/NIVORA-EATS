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
const patchfood=async(id,userId,data)=>
{
const done=await food.findOneAndUpdate(
    {
     _id:id,
     cook:userId
 },
 data,
 {
    new:true,
 }
);
return done;
}

//deletethefood//
const deletefood=async(id,userId)=>
{
    const del=await food.findByIdAndDelete(
        {
            _id:id,
            cook:userId
        }
    );
    return del;
}

//myfoodss//
const myfoods=async(userId)=>
{
const fdd=await food.find({
    cook:userId
});
return fdd;
}
// update ava//

const upda=async(id,foodid,data)=>
{
    const mod=await food.findByIdAndUpdate(
        {
         _id:id,
         cook:foodid
        },data,

        {
 new:true,
    }
);
return mod;
}

// all data of the cook//
 
const ckk=async(data)=>
{
    const coo=await food.find(
        {
     cook:data
        }
    );
    return coo;
}


module.exports={
    createfood,
    getall,
    idd,
    patchfood,
    deletefood,
    myfoods,
    upda,
    ckk
}
