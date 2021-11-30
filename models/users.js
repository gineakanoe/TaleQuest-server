const {DataTypes} = require('sequelize');
const db = require('../db');  

const User = db.define('users', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING(100),
        required: true,
        allowNull: false,
        unique: true,
    },
    lastName: {
        type: DataTypes.STRING(100),
        required: true,
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.STRING(100),
        required: true,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(100),
        required: true,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
 
module.exports = User;
