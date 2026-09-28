const cart = require("../models/cart");
const food = require("../models/food");
const address=require("../models/address");

const getcart=async(userid)=>
{
    const usercart=await cart.findOne({
        user:userid
    });
    if(!usercart)
    {
        throw new Error("cart not found on this user");
    }

if(!usercart.items || usercart.items.length===0)
{
    throw new Error("cart is empty");
}
const useraddress=await address.findOne({
    user:userid,
    isDefault:true,
});
if(!useraddress)
{
    throw new Error("default address is not found");
}

const items=await Promise.all(
    usercart.items.map(async(item)=>
    {
        const fooddata=await food.findById(item.food);
        if(!fooddata)
        {
            throw new Error("food not found");
        }
            const itemtotal = fooddata.price * item.quantity;
        return{
            food:fooddata._id,
            name:fooddata.name,
            price:fooddata.price,
            quantity:item.quantity,
            itemtotal:itemtotal
        };
    })
);

const subtotal=items.reduce(
    (total,item)=>total+item.itemtotal,0
);
const deliveryfee=40;
const grandtotal=subtotal+deliveryfee;
return{
    items,
    address:useraddress,
    subtotal,
    deliveryfee,
    grandtotal
};

    
};
module.exports={
    getcart
}