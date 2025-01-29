const mongoose = require('mongoose');
const zod = require('zod');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { SECRET_KEY } = require('../middleware/auth.js');
const { userModel, todoModel } = require('../db/db.js');

//replace your own mongo db cluster url
mongoose.connect("mongodb+srv://<username>:<password>@cluster0.4nmp6.mongodb.net/todo-app");

async function getMyLandingPage(req, res) {
  res.sendFile(path.join(__dirname,"/../../frontend/app/index.html"));
} 

async function getSignupPage(req, res) {
  res.sendFile(path.join(__dirname,"/../../frontend/signup/signup.html"));
}

async function getSigninPage(req, res) {  
  res.sendFile(path.join(__dirname,"/../../frontend/signin/signin.html"));
}

async function newUser(req, res) {
  const Schema = zod.object({
    username: zod.string().min(3).max(50),
    email: zod.string().min(3).max(50).email(),
    password: zod.string().min(6).max(30)
  });
  const check = Schema.safeParse(req.body);
  if(check.success) {
    try {
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;
      const hashedPassword = await bcrypt.hash(password, 5);

      await userModel.create({
        username : username,
        email : email,
        password : hashedPassword
      })
      res.status(200).json({
        message : "Added a new user"
      })
    } catch(e) {
      res.status(401).json({
        message : "Error in connecting to database",
        error : e
      })
    }
  } else {
    console.log(check);
    res.status(401).json({
      message : "Incorrect format of credentials",
      error : check.error
    })
  }
}

async function userEntry(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const findUser = await userModel.findOne({
      email : email
    });
    if(findUser) {
      const hashedPassword = findUser.password;
      const passMatchCheck = await bcrypt.compare(password, hashedPassword);
      if(passMatchCheck) {
        const userId = findUser._id;
        console.log(userId.toString());
        const token = jwt.sign({
          userId : userId.toString()
        }, SECRET_KEY);
        res.status(200).json({
          token : token
        })
      } else {
        res.status(401).json({
          message : "Incorrect credentials"
        })
      }
    } else {
      res.status(401).json({
        message : "Incorrect credentials"
      })
    }
  } catch(e) {
    res.status(401).json({
      message : "Error in connecting to database",
      error : e
    })
  }
}

async function getMyTodos(req, res) {
  const userId = req.userId;
  try {
    const todos = await todoModel.find({
      userId : userId
    });
    res.status(200).json(todos);
  } catch(e) {
    res.status(401).json({
      message : "authentication failed",
      error : e
    })
  }
}

async function deleteTodo(req, res) {
  const userId = req.userId;
  const todoNum = req.body.todoNum;
  const total = req.body.total;
  try {
    await todoModel.deleteOne({
      userId : userId,
      taskno : todoNum
    });
    await todoModel.updateMany({
      userId : userId,
      taskno : { $gt : todoNum}
    },{
      $inc : {taskno: -1} // this was new to me
    });
    res.status(204).send();
  } catch(e) {
    res.status(500).send();
  }
} 
async function addNewTodo(req, res) {
  const userId = req.userId;
  let newTodo = {
    taskno : req.body.taskno,
    title : req.body.title,
    details : req.body.details,
    status : req.body.status,
    userId : userId
  };
  try {
    await todoModel.create(newTodo);
    res.status(201).json({
      message : "created a new todo"
    });
  } catch(e) {
    res.status(400).json({
      message : "Bad Request",
      error : e
    })
  }
  
}

async function updateTodo(req, res) {
  let id = req.body.todoNum;
  let newStatus = req.body.status;
  let userId = req.userId;
  try{
    await todoModel.updateOne({
      userId : userId,
      taskno : id
    },{
      status : newStatus
    });
    res.status(200).json({
      message : "Successfully updated"
    })
  } catch(e) {
    res.status(500).json({
      message : "Server issue in updating"
    })
  }
}

async function swapTodos(req, res) {
  console.log("dwqdq?????")
  const { id1, id2 } = req.params;
  const userId = req.userId;
  try {
    const min = Math.min(id1, id2);
    const max = Math.max(id1, id2);
    const frontUser = await todoModel.findOne({
      userId : userId,
      taskno : min
    });
    const backUser = await todoModel.findOne({
      userId : userId,
      taskno : max
    });
    await todoModel.updateOne({
      userId : userId,
      taskno : max
    },{
      title : frontUser.title,
      details : frontUser.details,
      status : frontUser.status
    });
    await todoModel.updateOne({
      userId : userId,
      taskno : min
    },{
      title : backUser.title,
      details : backUser.details,
      status : backUser.status
    })
    res.status(200).json({
      message : "Swap done"
    });
  } catch(e) {
    res.status(500).json({
      message : "Server Issue in swapping todos"
    })
  }
  
}
module.exports = {
  getMyTodos,
  getMyLandingPage,
  deleteTodo,
  addNewTodo,
  updateTodo,
  swapTodos,
  getSignupPage,
  getSigninPage,
  newUser,
  userEntry
}