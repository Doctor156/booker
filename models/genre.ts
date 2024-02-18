'use strict';
import { Model } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class Genre extends Model {
    static associate() {
      const Book = sequelize.define('Book');
      const GenresToBooks = sequelize.define('GenresToBooks');

      // @ts-ignore
      Genre.hasMany(Book, { through: GenresToBooks });
    }
  }
  Genre.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Genre',
    tableName: 'genres',
  });

  return Genre;
};