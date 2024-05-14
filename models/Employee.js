// models/Employee.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true // Make userId the primary key
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  shiftStartsFrom: {
    type: DataTypes.TIME,
    allowNull: false
  },
  shiftEndsFrom: {
    type: DataTypes.TIME,
    allowNull: false
  }
});

module.exports = Employee;
