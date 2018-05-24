//const MongoClient=require("mongodb").MongoClient;
const {MongoClient,ObjectID}=require("mongodb");
const url="mongodb://localhost:27017";

MongoClient.connect(url,{useNewUrlParser:true},(err,client)=>{

if(err){
return console.log("Cannot connect to mongodb server");
}

console.log("Connected successfully");

const db=client.db("TodoApp");

//INSERT

/*
db.collection("Todos").insertOne({
text:"Something to do",
completed:false
},(err,result)=>{

    if(err){
        return console.log(
        "Unable to insert data",
        err
        );
    }

    console.log(JSON.stringify(result.ops,undefined,2));
});
*/

/*
db.collection("Users").insertOne({
first:"Raphael",
last:"Osaze"
},
(err,res)=>{
    if(err){
        return console.log("Could not insert "+ err);
    }
    console.log("Inserted"+ JSON.stringify(res.ops,undefined,2));


}
);
*/

//READ

// Fetching Data
/*db.collection("Todos").find().toArray().then((docs)=>{
console.log("Todos");
console.log(JSON.stringify(docs,undefined,2));
},
(err)=>{
    console.log("Unable to fetch todos",err);
}
);
*/

// Fetching Specific Data
/*
db.collection("Todos").find({completed:false}).toArray().then((docs)=>{
    console.log("Todos");
    console.log(JSON.stringify(docs,undefined,2));
    },
    (err)=>{
        console.log("Unable to fetch todos",err);
    }
    );
*/
    // Fetching Specific ID

  /*  db.collection("Todos").find({_id:new ObjectID( "5b033c45411b45dbf24733fd")}).toArray().then((docs)=>{
        console.log("Todos");
        console.log(JSON.stringify(docs,undefined,2));
        },
        (err)=>{
            console.log("Unable to fetch todos",err);
        }
        );
        */

         // Fetching COUNT
       /*  db.collection("Todos").find().count().then((count)=>{
            console.log("Todos Count");
            console.log(count);
            },
            (err)=>{
                console.log("Unable to fetch todos Count",err);
            }
            );*/

            //DELETE

            //deleteMany()
            //deleteOne()
            //findOneAndDelete()
   /* db.collection("Todos").deleteMany({text:"Sleep"}).then((result)=>{
        console.log(result);
    });*/

    //FIND ONE AND DELETE
    /*
    db.collection("Todos").findOneAndDelete({completed:false}).then((result)=>{
        console.log(result);
    });
    */

    //UPDATE
    db.collection("Todos").findOneAndUpdate({_id:new ObjectID("5b034716411b45dbf2473645")},
    {
        $set:{
            completed:true
        }
    },
    {
        returnOriginal:false
    }
).then((result)=>{
    console.log(result);
      });

client.close();
});