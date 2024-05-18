// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const Admin = sequelize.define('Admin', {
//   admin_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   role_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'Role',
//       key: 'role_id'
//     }
//   }
// });

// module.exports = Admin;
// model not needed