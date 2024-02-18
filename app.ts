import { NextFunction, Request, Response } from "express";
import express from 'express';
import path from 'path';

const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));


const authRouter = require('./routes/auth');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const genresRouter = require('./routes/genres');
const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');


app.use(authRouter);

// Роутинг
app.use('/', indexRouter);

// Круды
app.use('/users', usersRouter);
app.use('/genres', genresRouter);
app.use('/authors', authorsRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function(_req: Request, _res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
