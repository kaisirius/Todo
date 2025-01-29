const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
  username : String,
  email : {type : String, unique : true},
  password : String
});

const todoSchema = new Schema({
  taskno : Number,
  title : String,
  details : String,
  status : Boolean,
  userId : ObjectId
});

const userModel = mongoose.model('users', userSchema);
const todoModel = mongoose.model('todos', todoSchema);

module.exports = {
  userModel,
  todoModel
} 