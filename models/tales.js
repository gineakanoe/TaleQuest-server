const {DataTypes} = require('sequelize');
const db = require('../db');

const Tales = db.define('tales', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    entry: {
        type: DataTypes.STRING,
        allowNull: false
    },

    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    keywords: {
        type: DataTypes.STRING,
        allowNull: false
    },

    owner: {
        type: DataTypes.INTEGER
    }
});

module.exports = Tales;