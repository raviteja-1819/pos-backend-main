const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo: {
    type: DataTypes.BLOB,
    allowNull: true 
  },
  shiftStartsFrom: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  shiftEndsFrom: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Employee;
