'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    static associate(models) {
      const Book = sequelize.define('Book');

      Author.hasMany(Book);
    }
  }

  Author.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Author',
    tableName: 'authors',
  });

  return Author;
};