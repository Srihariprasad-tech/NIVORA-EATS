const cart = require("../models/cart");
const food = require("../models/food");

const cartfod = async (data, userId) => {

    const foodData = await food.findById(data.foodId);

    if (!foodData) {
        throw new Error("Food not found");
    }

    let userCart = await cart.findOne({
        user: userId
    });

    if (!userCart) {

        userCart = await cart.create({
            user: userId,
            items: [
                {
                    food: foodData._id,
                    quantity: data.quantity,
                    price: foodData.price
                }
            ],
            subtotal: foodData.price * data.quantity
        });

        return userCart;
    }


    const existingItem = userCart.items.find(
        item => item.food.toString() === foodData._id.toString()
    );

 
    if (existingItem) {

        existingItem.quantity += data.quantity;

    } else {

        userCart.items.push({
            food: foodData._id,
            quantity: data.quantity,
            price: foodData.price
        });
    }


    userCart.subtotal = userCart.items.reduce(
        (total, item) => {
            return total + (item.price * item.quantity);
        },
        0
    );


    await userCart.save();

    return userCart;
};


//get allcarts

const getcarts=async(data)=>
{
    const dataa=await cart.findOne({
        user:data
    });
    return dataa;
}


//update cart//
const updca=async(userid,foodid,quantity)=>
{
    if(!Number.isInteger(quantity)||quantity<1)
    {
        throw new Error("quantity must be at least 1");
    }
    if(quantity>20)
    {
        throw new Error("maximum quantity is 20");
    }
    const userca=await cart.findOne({
        user:userid
    });
    if(!userca)
    {
        throw new Error("cart not found");
    }
const existingItem=userca.items.find(
    item=>item.food.toString()===foodid.toString()
);
if(!existingItem)
{
    throw new Error("food is not in the cart");
}
existingItem.quantity=quantity;
userca.subtotal=userca.items.reduce(
    (total,item)=>
    {
        return total+(item.price*item.quantity);
    },
 0
);
await userca.save();
return userca;
}

//delete by id//
const delcart=async(foodid,userid)=>
{
 const userca=await cart.findOne({
        user:userid
    });
    if(!userca)
    {
        throw new Error("cart not found");
    }

    const existingItem=userca.items.find(
    item=>item.food.toString()===foodid.toString()
);
if(!existingItem)
{
    throw new Error("food is not in the cart");
}

    userca.items = userca.items.filter(
        item => item.food.toString() !== foodid.toString()
    );

    userca.subtotal = userca.items.reduce(
        (total, item) => {
            return total + (item.price * item.quantity);
        },
        0
    );

    await userca.save();

    return userca;
}

// remove the eniter cart //
const remcart=async(userid)=>
{
 const userca=await cart.findOne({
        user:userid
    });
    if(!userca)
    {
        throw new Error("cart not found");
    }

    const data=await cart.findOneAndDelete({
        user:userid,
    });
    return data;
}



module.exports={
    cartfod,
    getcarts,
    updca,
    delcart,
    remcart
}