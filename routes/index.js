const { Sequelize, QueryTypes } = require('sequelize');

var express = require('express');
var router = express.Router();

const sequelize = new Sequelize({
  dialect: 'postgres',
  storage: '/var/lib/postgresql/data',
  host: 'localhost',
  port: '5432',
  database: 'booker',
  username: 'docdoc',
  password: '123456',
  logging: (...msg) => console.log(msg)
});

test();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


async function test(): Promise {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const test = await sequelize.query('SELECT * FROM public.weather', {raw: true});
  console.log(JSON.stringify(test[1]));
  console.log('222');
}