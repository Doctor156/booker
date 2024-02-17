const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const process = require("process");
const { User } = require("./models/user.js");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const env = process.env.NODE_ENV || 'development';

// Инициализируем модели Sequelize
const initedSequlizeModels = require('./models/index');
const models = initedSequlizeModels.sequelize.models;

// Роутинг, выставляем порядок наследования
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

async function test() {
  // console.log(User);
  const jane = models.sequelize.models.User.build({ id: 1, name: 'Админ', role: 'admin' });
  console.log(jane);
  //
  await jane.save();
  // console.log(models.sequelize.models.Author.add);
  // console.log(models.models);
  // console.log(models);
  //const jane = await User.create({ firstName: "Jane", lastName: "Doe" });
}