'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.changeColumn(
            'books',
            'author_id',
            {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'authors',
                    }
                },
                key: 'id',
                allowNull: false,
            },
            { transaction }
        );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {}
};