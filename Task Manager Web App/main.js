const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url = "<enter your mongoDB url here>";

const client = new MongoClient(url);
const dbName = "myOwnToDoList";

var dbInstance = null;

client.connect().then(function(){
	console.log("Db connected");
	dbInstance = client.db(dbName);
})

const express = require('express');
const app = express();
const port = 3000;
var fs = require('fs');
app.use(express.static("frontend"));

app.use(express.json());

var session = require('express-session')
app.set('view engine','ejs');
app.set("views");
app.use(express.urlencoded());

app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: false
}))


app.get('/', function(req, res){


ObjectId = mongodb.ObjectID;
//authorization

//if user is logged in
//show home
//else show login
		console.log(req.session.isLoggedIn);
	
	if(req.session.isLoggedIn){
		readTodos(function(todos){
			var array = [];
			for(var i=0;i<todos.length;i++){
				if(todos[i].createdBy == req.session.username){
					array.push(todos[i]);
				}
			}
			res.render("home.ejs",{data:array});
		})
		
	}else{
		
		res.redirect("/signIn.html");
	}
});

app.post("/todo",function(req,res){
	
	var todo = {
		text:req.body.todo,
		createdBy:req.session.username,
		createdAt: Date.now()

	}
	
	saveTodos(todo,function(){
		res.redirect("/");
	});
	
});

app.get('/sessionData', function(req, res){


		res.send(req.session.nameOfUser);
	
});

app.post("/login",function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	
	readUsers(function(data){
		if(data==null){
			res.status(404);
			res.end("login failed");
		}
		var ourUser = null;
		console.log(data);
		for(var i=0;i<data.length;i++){
			if(data[i].email == username){
				if(data[i].password==password){
					ourUser = data[i];
				}
			}
		}
		
		if(ourUser!=null){
			req.session.isLoggedIn = true;
			req.session.nameOfUser = ourUser.name;
			req.session.username = ourUser.email;
			res.status(200);
			
			res.end("login success");
		}else{
			res.status(404);
			res.end("login failed");
		}
	});

});

app.post("/endSess",function(req,res){
	if(req.body.b == true){
		req.session.destroy();
	}
	res.send("true");
	res.end();
});

app.post("/checkAvail",function(req,res){
	readUsers(function(data){
		if(data.length==0){
			var resp = true;
			res.send(JSON.stringify(resp));
		}else{
			console.log(data);

			var resp = true;
			var comp = req.body;
			console.log(comp);
			comp = comp.em;
			for(var i=0;i<data.length;i++){
			if(data[i].email == comp){
				resp = false;
			}
		}
			res.send(JSON.stringify(resp));
		}
	})
});


app.post("/editTodos",function(req,res){
	const collection = dbInstance.collection("todoList");
	collection.update
(
	{
		"_id" : ObjectId(req.body.original)
	},
	{
		$set :
		{
			"text":req.body.toedit
		}
	}
)
res.redirect("/");
});

app.post("/deleteTodos",function(req,res){
	console.log(req.body);
	var body = req.body;
	const collection = dbInstance.collection("todoList");
	collection.remove({"_id": ObjectId(body.todelete)})

	res.redirect("/");
	});

app.post("/createUser",function(req,res){
	const collection = dbInstance.collection("users");
	req.body.createdAt= Date.now();
	collection.insert(JSON.parse(req.body.b)).then(function(){
		res.redirect("/");
	})
});

function readUsers(callback){
	const collection = dbInstance.collection("users");
	collection.find({}).toArray().then(function(data){
		callback(data);
	}).catch(function(){
		callback([]);
	})
}

function readTodos(callback){
	const collection = dbInstance.collection("todoList");
	collection.find({}).toArray().then(function(data){
		callback(data);
	}).catch(function(){
		callback([]);
	})
}

function saveTodos(data,callback){
	const collection = dbInstance.collection("todoList"); //todoList willo get generated if not already present
	collection.insert(data).then(function(){
		callback();
	})
}

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})

