var mongoose=require("mongoose");
var Schema=mongoose.Schema;


var todoSchema=new Schema(
    {
        text:{
            type:String ,
        required:true,
        minLenght:1,
        trim:true
    },
        
        completed:
        {
         type:Boolean,
         default:false
        },
        completedAt:
        {
        type:Number,
        default:null
    }
    });
    
    const Todo = mongoose.model('Todo', 
    todoSchema
    );
    
    module.exports={Todo}