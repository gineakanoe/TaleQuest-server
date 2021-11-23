require('dotenv').config();
const Express = require('express');
const app = Express();
const dbConnection = require('./db');

app.use(require('./middleware/headers'));

const controllers = require('./controller');

app.use(Express.json());
app.use('/user', controllers.userController);

app.use ('/tales', controllers.talesController);
app.use('/quests', controllers.questsController);


// app.use('/test', (req, res) => {
//     res.send('This is a message from the test endpoint on the server!')
// });

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(4000, () => {
            console.log(`[Server]: App is listening pn 4000.`);
        });
        // app.listen(process.env.PORT, () => {
        //     console.log(`[Server]: App is listening on ${process.env.PORT}.`);
        // });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. ${err}`);
    });