const menuservice=require("../services/menuservice");
const getmenu=(req,res)=>
{
    const menu=menuservice.getmenu();
    res.json(menu);
}
module.exports={
    getmenu
}