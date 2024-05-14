const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Employee',
      key: 'employee_id'
    }
  },
  table_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Table',
      key: 'table_id'
    }
  },
  order_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  discount_amount: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  tax_amount: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  payment_status: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Order;
