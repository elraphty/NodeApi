var mongoose=require("mongoose");
var Schema=mongoose.Schema;

const url="mongodb://localhost/NewTodo";
mongoose.connect(url);


var blogSchema=new Schema(
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
blogSchema
);

const newTodo = new Todo(
    { text: 'Edit this video'
}

);
newTodo.save().then((doc) =>{ 
    console.log('Saved Todo',doc)
},
(err)=>{
    
    if(err){
        console.log("Unable to save todo "+err);
    }
}
);
