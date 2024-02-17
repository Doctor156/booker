'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GenresToBooks extends Model {
    static associate(models) {
      const Genre = sequelize.define('Genre');
      const Book = sequelize.define('Book');

      GenresToBooks.belongsToMany(Genre);
      GenresToBooks.belongsToMany(Book);
    }
  }
  GenresToBooks.init({
    genre_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GenresToBooks',
    tableName: 'genres-to-books',
  });

  return GenresToBooks;
};