const express = require('express');
const cors = require('cors');
const { getMyTodos , getMyLandingPage, deleteTodo, addNewTodo, updateTodo, swapTodos, getSignupPage, getSigninPage, newUser, userEntry }  = require('./routes/handler.js');
const { auth } = require('./middleware/auth.js');
const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/..')); // imp thing regarding configuration of server app

app.get("/Todos", getMyLandingPage); 

app.get("/fetchtodos", auth, getMyTodos);

app.delete("/Todos", auth, deleteTodo);

app.post("/Todos", auth, addNewTodo);

app.put("/Todos", auth, updateTodo);

app.put("/Todos/:id1/:id2", auth, swapTodos);

app.get("/signup", getSignupPage); 

app.get("/signin", getSigninPage); 

app.post("/signup", newUser); 

app.post("/signin", userEntry); 

app.listen(PORT,() => console.log("Backend running on port 3000"));

