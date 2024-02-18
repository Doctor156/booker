'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('users', 'password', {
        type: Sequelize.STRING,
        allowNull: true,
      }, {transaction});

      await queryInterface.addColumn('users', 'authToken', {
        type: Sequelize.STRING,
        allowNull: true,
      }, {transaction});

      transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('users', 'password', {transaction: t}),
        queryInterface.removeColumn('users', 'authToken', {transaction: t})
      ]);
    });
  }
}
