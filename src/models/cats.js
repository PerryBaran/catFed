module.exports = (connection, Sequelize) => {
  const schema = {
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    markings: DataTypes.STRING,
    lastFed: DataTypes.DATE
  }

  return sequelize.define('Cat', schema);
};