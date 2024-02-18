'use strict';
import { Model } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class GenresToBooks extends Model {
    static associate() {
      const Genre = sequelize.define('Genre');
      const Book = sequelize.define('Book');

      // @ts-ignore
      GenresToBooks.belongsToMany(Genre);
      // @ts-ignore
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