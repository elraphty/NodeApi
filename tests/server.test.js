const expect=require("expect");
const request=require("supertest");
const {ObjectID} = require('mongodb');


const {app}=require("../server/server");
const {Todo}=require("../models/todo");

//Fake database
const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
  }, {
    _id: new ObjectID(),
    text: 'Second test todo'
  }];
  
// it should happen the test
//deleting all other todos
//before get todo
beforeEach((done) => {
    Todo.remove({}).then(() => done());
  });
// after get todo

beforeEach((done) => {
    Todo.remove({}).then(() => {
      return Todo.insertMany(todos);
    }).then(() => done());
  });


describe("POST / todos",()=>{

    it("Should create a new todo",(done)=>{
        var text="Test todo text";
     request(app) //connecting with server
     .post("/todos") //post link
     .send({text}) //post body
     //.set('Accept', 'application/json')
     .expect(200)  //expected response
     .expect((res)=>{
    expect(res.body.text).toBe(text);
     })
     .end((err,res)=>{// check if error exists
        if(err)
        {
            return done(err);
        }
    
        //Checking if todo exists in db
        //find only text variable text in database
       Todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e)=>done(e));
     });
    });

    //Testing for invalid body data
    it('should not create todo with invalid body data', (done) => {
        request(app)
          .post('/todos')
          .send({})
          .expect(400)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
    
            Todo.find().then((todos) => {
              expect(todos.length).toBe(2) //return only 2 documents in fake database;
              done();
            }).catch((e) => done(e));
          });
      });

//Testing get todo
      describe('GET /todos', () => {
        it('should get all todos', (done) => {
          request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
              expect(res.body.todos.length).toBe(2);
            })
            .end(done);
        });
    });

    //Testing single todo
    describe('GET /todos/:id', () => {
        it('should return todo doc', (done) => {
          request(app)
            .get("/todos/"+todos[0]._id.toHexString())
            .expect(200)
            .expect((res) => {
              expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
        });
      
        it('should return 404 if todo not found', (done) => {
          var hexId = new ObjectID().toHexString();
      
          request(app)
            .get("/todos/"+hexId)
            .expect(404)
            .end(done);
        });
      
        it('should return 404 for non-object ids', (done) => {
          request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
        });
    });

    
});