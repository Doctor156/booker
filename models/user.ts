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
    password: DataTypes.STRING,
    authToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });

  return User;
};