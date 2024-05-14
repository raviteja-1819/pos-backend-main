const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Organization = sequelize.define('Organization', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  organizationName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organizationType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  openingTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  closingTime: {
    type: DataTypes.TIME,
    allowNull: false,
   
  }
});

module.exports = Organization;
