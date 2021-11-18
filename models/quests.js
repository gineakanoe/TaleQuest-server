const {DataTypes} = require('sequelize');
const db = require('../db');

const Quests = db.define('quests', {
    entry: {
        type: DataTypes.STRING,
        allowNull: false
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false
    },

    timeLimit: {
        type: DataTypes.STRING,
        allowNull: false
    },

    owner: {
        type: DataTypes.INTEGER
    }
});

module.exports = Quests;