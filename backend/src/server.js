require("dotenv").config();

const app=require("./app");
const connectdb = require("./config/db");

const port=process.env.PORT;





const startserver=async()=>
{
    try{
        await connectdb();
        app.listen(port,()=>
{
    console.log(`server is listening on the port no ${port}`);
});
    }
 catch(error)
 {
 console.log("MONGODB CONNECTION FAILED CHECK THE URL PLEASE",error.message);
 }
}
startserver();
