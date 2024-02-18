'use strict';

import { Model } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class Book extends Model {
    static associate() {
      const Author = sequelize.define('Author');
      const Genre = sequelize.define('Genre');
      const GenresToBooks = sequelize.define('GenresToBooks');

      Book.belongsTo(Author);
      // @ts-ignore
      Book.hasMany(Genre, { through: GenresToBooks });
    }
  }
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