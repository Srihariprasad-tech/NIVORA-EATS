const mongoose=require("mongoose");
const connectdb=async()=>
{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MONGO-DB CONNECTED ");
}
module.exports=connectdb;

