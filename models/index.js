const db = require('../db');

const UserModel = require('./user');
const TalesModel = require('./tales');
const QuestsModel = require('./quests');

//database associations
const UsersModel = require('./users');
const PostsModel = require('./posts');
const CommentsModel = require('./comments');

//associations
UsersModel.hasMany(PostsModel);
UsersModel.hasMany(CommentsModel);

PostsModel.belongsTo(UsersModel);
PostsModel.hasMany(CommentsModel);

CommentsModel.belongsTo(PostsModel);

module.exports = {
    UserModel, TalesModel, QuestsModel,
    dbConnection: db,
    models: {
        UsersModel,
        PostsModel,
        CommentsModel
    }
};