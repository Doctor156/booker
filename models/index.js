'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};


const sequelize = new Sequelize({
    ...config,
    logging: (...msg) => console.log(msg)
});

const modelDefiners = [
    require('./author.js'),
    require('./book.js'),
    require('./genre.js'),
    require('./genresToBooks.js'),
    require('./user.js'),
    // Add more models here...
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize, Sequelize.DataTypes);
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
