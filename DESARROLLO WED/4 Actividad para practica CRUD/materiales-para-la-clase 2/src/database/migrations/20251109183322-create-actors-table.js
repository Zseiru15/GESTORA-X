module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('actors', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      rating: Sequelize.DECIMAL,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('actors');
  }
};
