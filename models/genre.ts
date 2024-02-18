'use strict';
import { Model } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class Genre extends Model {}
  Genre.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Genre',
    tableName: 'genres',
  });

  return Genre;
};