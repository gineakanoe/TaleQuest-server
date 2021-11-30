const {DataTypes} = require('sequelize');
const db = require('../db');

const Quests = db.define('quests', {
    // id: {
    //     type: DataTypes.UUID,
    //     primaryKey: true,
    //     defaultValue: DataTypes.UUIDV4,
    //     allowNull: false,
    // },
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