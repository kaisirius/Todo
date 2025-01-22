const express = require('express');
const cors = require('cors');
const { getMyTodos , deleteTodo, addNewTodo, updateTodo, swapTodos} = require('./routes/handler.js');
const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/Todos",getMyTodos);

app.delete("/Todos",deleteTodo);

app.post("/Todos", addNewTodo);

app.put("/Todos", updateTodo);

app.put("/Todos/:id1/:id2",swapTodos);

app.listen(PORT,() => console.log("Backend running on port 3000"));

