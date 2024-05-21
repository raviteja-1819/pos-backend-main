const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Table = sequelize.define('Table', {
  table_id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  table_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seating_area: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Table;
