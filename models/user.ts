'use strict';

import { Model, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class User extends Model {}
  User.init({
    role: {
      type: DataTypes.STRING,
      defaultValue: 'common',
    },
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });

  return User;
};