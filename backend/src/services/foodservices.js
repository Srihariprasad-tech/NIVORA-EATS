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
const getall=async(query)=>
{
    const filter={};
    //search //
    if(query.search)
    {
     filter.$or=[
        {
        name:{
            $regex:query.search,
            $options:"i"
        }
        },
        {
            shortDescription:{
                $regex:query.search,
                $options:"i"
            }
        },
        {
            description:{
                $regex:query.search,
                $options:"i"
            }
        }
     ]
    }
  //filter//
 if (query.cuisine) {
        filter.cuisine = query.cuisine;
    }
    if (query.region) {
        filter.region = query.region;
    }
    if (query.foodType) {
        filter.foodType = query.foodType;
    }
    if (query.category) {
        filter.category = query.category;
    }
//min/max filter//
  if (query.minPrice || query.maxPrice) {

        filter.price = {};

        if (query.minPrice) {
            filter.price.$gte = Number(query.minPrice);
        }

        if (query.maxPrice) {
            filter.price.$lte = Number(query.maxPrice);
        }
    }
//pagination//
const page=Number(query.page)||1;
const limit=Number(query.limit)||10;
const skip=(page-1)*limit;

// sorting//
let sort={};
if(query.sort==="price_asc")
{
    sort.price=1;
}
if(query.sort==="price_desc")
{
    sort.price=-1;
}
else{
    sort.createdAt=-1;
}



//count documents//
const total=await food.countDocuments(filter);

    const allfo = await food
    .find(filter)
    .skip(skip)
    .limit(limit);

return {
    foods: allfo,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
};
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
