var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose")
var dotenv = require("dotenv")

dotenv.config()
mongoose.set('strictQuery', true)
var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//Database
const mongoDB = "mongodb://localhost:27017/testdb"
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error"))



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
//app.set("views", path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', indexRouter);
app.use('/api', usersRouter);

module.exports = app;
