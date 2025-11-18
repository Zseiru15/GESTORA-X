module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('genres', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: Sequelize.STRING,
      ranking: Sequelize.INTEGER,
      active: Sequelize.BOOLEAN,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('genres');
  }
};
