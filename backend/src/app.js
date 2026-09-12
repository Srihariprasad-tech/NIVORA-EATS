const express=require('express');
const app=express();

const errohandler=require("./middleware/errohandler");
const createroute=require("./routes/userRoutes");

app.use(express.json());



app.use("/users",createroute);
app.use(errohandler);
module.exports=app;