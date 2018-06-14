var mongoose = require("mongoose");

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todolist');

mongoose.Promise = Promise;

module.exports.Todo = require("./todos");