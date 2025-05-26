const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
  codigo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data_nascimento: DataTypes.DATEONLY,
  rg: DataTypes.STRING,
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telefone: DataTypes.STRING,
  endereco: DataTypes.STRING,
  numero: DataTypes.STRING,
  cep: DataTypes.STRING
}, {
  tableName: 'clientes',
  timestamps: false
});

module.exports = Cliente;

