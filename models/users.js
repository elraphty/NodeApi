var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var userSchema=new Schema(
    {
    email:{
            type:String,
        required:true,
        minLenght:1,
        trim:true
    }
    });
    
    const User= mongoose.model('User', 
    userSchema
    );

    module.exports={User}