const mongoose=require("mongoose");
const testschema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String
    }
});

const test=mongoose.model("test",testschema);
module.exports=test;