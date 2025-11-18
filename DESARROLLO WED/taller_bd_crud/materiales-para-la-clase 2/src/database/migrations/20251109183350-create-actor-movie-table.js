module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('actor_movie', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      actor_id: Sequelize.INTEGER,
      movie_id: Sequelize.INTEGER
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('actor_movie');
  }
};
