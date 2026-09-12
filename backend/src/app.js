const express=require('express');
const app=express();

const errohandler=require("./middleware/errohandler");
const createroute=require("./routes/userRoutes");
const authroute=require("./routes/authRoutes");

app.use(express.json());



app.use("/users",createroute);
app.use("/new",authroute);
app.use((req,res)=>
{
    res.status(404).json({
        success:false,
        message:"route not found"
    });
});

app.use(errohandler);
module.exports=app;