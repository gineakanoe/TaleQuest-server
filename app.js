require('dotenv').config();

// imports
const Express = require('express');
const dbConnection = require('./db');
const controllers = require('./controller');
const middleware = require('./middleware');

// instantation
const app = Express();

// middleware
app.use(middleware.CORS);
app.use(Express.json());

// endpoints
app.use('/auth', controllers.usersController);
app.use(middleware.validateSession);
app.use ('/tales', controllers.talesController);
app.use('/quests', controllers.questsController);
app.use('/posts', controllers.postsController);
app.use('/comments', controllers.commentsController);

// database auth & sync
try {
    dbConnection.authenticate()
        .then(async() => await dbConnection.sync(/*{force: true}*/))
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log(`[Server]: App is listening on ${process.env.PORT}.`);
            });
        });
}catch(err) {
        console.log(`[Server]: Server crashed. ${err}`);
};




    //? Orig before associations
//     require('dotenv').config();
// const Express = require('express');
// const app = Express();
// const dbConnection = require('./db');

// app.use(require('./middleware/headers'));

// const controllers = require('./controller');

// app.use(Express.json());
// app.use('/user', controllers.userController);

// app.use ('/tales', controllers.talesController);
// app.use('/quests', controllers.questsController);


// // app.use('/test', (req, res) => {
// //     res.send('This is a message from the test endpoint on the server!')
// // });

// dbConnection.authenticate()
//     .then(() => dbConnection.sync(/*{force: true}*/))
//     .then(() => {
//         app.listen(process.env.PORT, () => {
//             console.log(`[Server]: App is listening on ${process.env.PORT}.`);
//         });
//     })
//     .catch((err) => {
//         console.log(`[Server]: Server crashed. ${err}`);
//     });