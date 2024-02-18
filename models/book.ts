'use strict';

import { Model } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class Book extends Model {}

  Book.init({
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    author_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
  });

  return Book;
};