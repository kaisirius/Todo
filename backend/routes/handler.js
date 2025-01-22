let todos = [];
let taskNo = 1;

function getMyTodos(req, res) {
  console.log("sending todos -> ");
  console.log(todos);
  res.status(200).json(todos);
}

function deleteTodo(req, res) {
  let id = req.body.todoNum;
  if((id - 1) >= 0) {
    todos.splice(id - 1,1);
    taskNo--;
    res.status(204).send();
  } else {
    res.status(404).json({
      message :"error in deletion"
    })
  }
} 
function addNewTodo(req, res) {
  let newTodo = {
    title : req.body.title,
    details : req.body.details,
    status : req.body.status
  };
  todos.push(newTodo);
  taskNo++;

  res.status(201).json({
    message : "created a new todo"
  })
}

function updateTodo(req, res) {
  let id = req.body.todoNum;
  let newStatus = req.body.status;

  todos[id - 1].status = newStatus;
  res.status(200).json({
    mssg : "Update complete"
  });
}

function swapTodos(req, res) {
  let { id1 , id2 } = req.params;
  temp = todos[id1 - 1];
  todos[id1 - 1] = todos[id2 - 1];
  todos[id2 - 1] = temp;
  res.status(200).json({
    mssg : "swap completed"
  });
}
module.exports = {
  getMyTodos,
  deleteTodo,
  addNewTodo,
  updateTodo,
  swapTodos
}