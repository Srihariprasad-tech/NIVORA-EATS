const address = require("../models/address");

// create address//
const createaddress = async (data, userId) => {
    const addressData = {
        ...data,
        user: userId
    };
    const newAddress = await address.create(addressData);
    return newAddress;
};

// get all address//
const getaddress=async(data)=>
{
    const getalladd=await address.find({
        user:data,
    });
    return getalladd;
}
//getaddressbyid//
const getaddressbyid=async(addressId,userId) => {
    const result = await address.findOne({
        _id: addressId,
        user: userId
    });
    if (!result) {
        throw new Error("Address not found");
    }
    return result;
};

// updateaddressbyid//
const updateaddressbyid=async(addressid,userid,data)=>
{
    const updatedadd = await address.findOneAndUpdate(
        {
            _id: addressid,
            user: userid
        },
        data,
        {
            new: true,
            runValidators: true
        }
    );
       if (!updatedadd) {
        throw new Error("Address not found");
    }
    return updatedadd;
}
//deleteaddressbyid//
const deladd= async (addressId, userId) => {
    const deletedadd = await address.findOneAndDelete({
        _id: addressId,
        user: userId
    });
    if (!deletedadd) {
        throw new Error("Address not found");
    }
    return deletedadd;
};

// defalut address//
const setDefaultAddress=async(addressid,userid)=>
{
    const selectedaddress=await address.findOne({
        _id:addressid,
        user:userid
    });
    if(!selectedaddress){
        throw new Error("address not found");
    }
    await address.updateMany(
{
    user:userid
},
{
    $set:{
        isDefault:false
    }
}
    );
    selectedaddress.isDefault=true;
    await selectedaddress.save();
    return selectedaddress;
}

module.exports = {
    createaddress,
    getaddress,
    getaddressbyid,
    updateaddressbyid,
    deladd,
    setDefaultAddress
};