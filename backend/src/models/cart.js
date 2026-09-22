const mongoose=require("mongoose");

const cartItemSchema=new mongoose.Schema({
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"food",
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1,
    },
    price:{
        type:Number,
        required:true,
        min:0
    }
},
{
    _id:false
}
);

const cartSchema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
            unique:true
        },
        items:[cartItemSchema],
        subtotal:{
            type:Number,
            default:0,
            min:0
        }
    },
    {
        timestamps:true
    }
);
module.exports=mongoose.model("cart",cartSchema);