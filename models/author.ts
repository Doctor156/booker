'use strict';
import { Model } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class Author extends Model {}

  Author.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Author',
    tableName: 'authors',
  });

  return Author;
};