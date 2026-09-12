const mongoose=require("mongoose");
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:100,
    },
    role:{
        type:String,
        required:true,
        enum:["user","admin"],
        default:"user"
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:10,
        maxlength:15
    },
    isactive:{
        type:Boolean,
        default:true,
    },
});

const user=mongoose.model("user",userschema);
module.exports=user;
