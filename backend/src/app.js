const express=require('express');
const app=express();

const menuroutes=require("./routes/menuroutes");

app.use(express.json());
app.use("/api/menu",menuroutes);



const menu=require("./routes/menu");
 app.use("/menu",menu); 
 const middlewarerouter=require("./routes/middleware");
 app.use("/middleware",middlewarerouter);

 const testroutes=require("./routes/testroutes");
 app.use("/api/test",testroutes);

 app.use("/api/read",testroutes);
 app.use("/api/readone/",testroutes);

app.use("/api/update/",testroutes);
app.use("/api/delete",testroutes);
const errohandler=require("./middleware/errohandler");
app.use(errohandler);
module.exports=app;