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

module.exports = {
    cartfod
};