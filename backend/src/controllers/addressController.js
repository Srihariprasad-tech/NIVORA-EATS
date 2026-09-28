const addressService=require("../services/addressService");


//create address//
const createadd=async(req,res,next)=>
{
    try{
        const data=req.body;
        const userid=req.user.userid;
        const add=await addressService.createaddress(data,userid);
        res.json({
            success:true,
            message:"new address created successfully",
            add,
        });
    }
        catch(error)
        {
            next(error);
        }
}
//get address//
const getadd=async(req,res,next)=>
{
    try{
        const userid=req.user.userid;
        const gett=await addressService.getaddress(userid);
        res.json({
            success:true,
            message:"all address are displayed",
            gett
        });
    }
    catch(error){
        next(error);
    }
}

//getaddressbyid//
const getid=async(req,res,next)=>{
    try {
        const addressId = req.params.id;
        const userId = req.user.userid;
        const result = await addressService.getaddressbyid(addressId,userId);
        res.json({
            success: true,
            message: "Address displayed successfully",
            address: result
        });
    } catch (error) {

        next(error);
    }
};
// updateaddressbyid//
const updateadd=async(req,res,next)=>{
    try {
        const addressId = req.params.id;
        const userId = req.user.userid;
        const data=req.body;
        const result = await addressService.updateaddressbyid(addressId,userId,data);
        res.json({
            success: true,
            message: "address updated successfully",
            address: result
        });
    } catch (error) {
        next(error);
    }
};

// deleteaddressbyid//
const deleteaddress=async(req,res,next)=>
{
    try{
        const userid=req.user.userid;
        const addressid=req.params.id;
        const result=await addressService.deladd(addressid,userid);
        res.json({
            success:true,
            message:"address deleted successfully",
        });
    }
    catch(error)
    {
        next(error);
    }
}
//default address//
const setDefault = async (req, res, next) => {
    try {
        const addressId = req.params.id;
        const userId = req.user.userid;
        const result = await addressService.setDefaultAddress(
            addressId,
            userId
        );
        res.json({
            success: true,
            message: "Default address updated successfully",
            address: result
        });
    } catch (error) {

        next(error);
    }
};
module.exports={
    createadd,
    getadd,
    getid,
    updateadd,
    deleteaddress,
    setDefault
}