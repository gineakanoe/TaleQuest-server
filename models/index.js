const db = require('../db');

const UsersModel = require('./users');
const TalesModel = require('./tales');
const QuestsModel = require('./quests');

//database associations
const PostsModel = require('./posts');
const CommentsModel = require('./comments');

//associations
UsersModel.hasMany(PostsModel);
UsersModel.hasMany(TalesModel);
UsersModel.hasMany(QuestsModel);
UsersModel.hasMany(CommentsModel);

PostsModel.belongsTo(UsersModel);
TalesModel.belongsTo(UsersModel);
QuestsModel.belongsTo(UsersModel);
PostsModel.hasMany(CommentsModel);
TalesModel.hasMany(CommentsModel);
QuestsModel.hasMany(CommentsModel);

CommentsModel.belongsTo(PostsModel);
CommentsModel.belongsTo(TalesModel);
CommentsModel.belongsTo(QuestsModel);

module.exports = {
    dbConnection: db,
    models: {
        PostsModel,
        CommentsModel,
        UsersModel, 
        TalesModel, 
        QuestsModel
    }
};