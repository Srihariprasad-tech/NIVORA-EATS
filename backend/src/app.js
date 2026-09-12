const express=require('express');
const app=express();

const errohandler=require("./middleware/errohandler");
const createroute=require("./routes/userRoutes");

app.use(express.json());
app.use(errohandler);


app.use("/create",createroute);
app.use("/read",createroute);
app.use("/delete",createroute); 
module.exports=app;