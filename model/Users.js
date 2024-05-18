const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./Role');

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
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
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
  allowNull: false,
  unique: true
},
shiftStartsFrom: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  shiftEndsFrom: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: 'id'
    }
  }

});
Users.belongsTo(Role, { foreignKey: 'roleId' });
module.exports = Users;
