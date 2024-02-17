'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const Author = sequelize.define('Author');
      const Genre = sequelize.define('Genre');
      const GenresToBooks = sequelize.define('GenresToBooks');

      Book.belongsTo(Author);
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