var express=require("express");
var bodyParser=require("body-parser");
const {ObjectID}=require("mongodb");


var {mongoose}=require("../db/mongoose");
//var {Schema}=require("../db/mongoose");
var {Todo}=require("../models/todo");
var {User}=require("../models/users");

var app=express();
var port=process.env.PORT || 3000;
app.use(bodyParser.json());

app.post("/todos",(req,res)=>{
 
    var todo=new Todo({
     text:req.body.text
    });

    todo.save().then((doc)=>{
res.send(doc);
    },
    (err)=>{
     res.status(400).send(err);
    }
);
console.log(req.body);

});

//getting todos
app.get("/todos",(req,res)=>{
Todo.find().then((todos)=>{
res.send({todos});
},
(err)=>{
res.status(400).send(err);
}
);

});

//getting single todo
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    Todo.findById(id).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    });
  });

app.listen(port,()=>{
console.log("App listening on port "+3000);
});

module.exports={app};