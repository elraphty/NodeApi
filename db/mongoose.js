var mongoose=require("mongoose");

const url="mongodb://localhost/NewTodo";
mongoose.connect(url);

module.exports={
    mongoose
}