const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:14b9c4a2e2ce45508f4991456a37ae47@localhost:5432/tale-quest-server');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    ssl: process.env.ENVIRONMENT === 'production'
});

// const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
//     host: process.env.DATABASE_HOST,
//     dialect: process.env.DATABASE_DIALECT
// });

module.exports = sequelize;
