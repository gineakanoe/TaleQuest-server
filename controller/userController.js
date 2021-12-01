//? Orig
const router = require('express').Router();
const {UserModel} = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors'); 
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

router.get('/practice', (req, res) => {
    res.send('Hey! This is the practice route for users!  Good job!') 
});

router.post('/register', async (req, res) => {

    let {firstName, lastName, username, email, password} = req.body.user;

    try {
        const User = await UserModel.create({
            firstName,
            lastName,
            username,
            email,
            password: bcrypt.hashSync(password, 13),
        });

        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
        
        res.status(201).json({
            message: 'User successfully registered',
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use! Try again!",
            });
        } else {
            res.status(500).json({
                message: "Failed to register user ;(",
            });
        }
    }
});

router.post('/login', async (req, res) => {

    let {username, password} = req.body.user;

    try {
        let loginUser = await UserModel.findOne({
            where: {
                username: username,
            },
        });

        if (loginUser) {

            let passwordComparison = await bcrypt.compare(password, loginUser.password);
    
          if (passwordComparison) {

    let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

            res.status(200).json({
              user: loginUser,
              message: "User successfully logged in!",
                sessionToken: token
            });
        } else {
                res.status(401).json({
                message: 'Incorrect Username or Password'
              })
        }
            } else {
                   res.status(401).json({
                   message: 'Incorrect username or password'
                });
            }
    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
});

// router.get('/userinfo', async (req, res) => {
//     try {
//         await models.UsersModel.findAll({
//             include: [{
//                 model: models.PostsModel,
//                 include: [{
//                     model: models.CommentsModel
//                 }]
//             }],
//             include: [{
//                 model: models.TalesModel,
//                 include: [{
//                     model: models.CommentsModel
//                 }]
//             }],
//             include: [{
//                 model: models.QuestsModel,
//                 include: [{
//                     model: models.CommentsModel
//                 }]
//             }]
//         })
//         .then(
//             users => {
//                 res.status(200).json({
//                     users: users
//                 });
//             }
//         )
//     } catch (err) {
//         res.status(500).json({
//             error: `Failed to retrieve users: ${err}`
//         });
//     };
// });


module.exports = router;


//? Code With database associations - did work, but client isn't talking to some of it
// const router = require('express').Router();
// const { models } = require('../models');
// const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken');
// const { UniqueConstraintError } = require('sequelize/lib/errors'); 

// // test
// router.get('/practice', (req, res) => {
//     res.send('Hey! This is the practice route for users!  Good job!') 
// });

// // Create New User
// router.post('/register', async (req, res) => {
//     const {firstName, lastName, username, email, password} = req.body.user;
//     try {
//         await models.UsersModel.create({
//             firstName: firstName,
//             lastName: lastName,
//             username: username,
//             email: email,
//             password: bcrypt.hashSync(password, 13),
//         })
//         .then(
//             user => {
//                 let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
//                 res.status(201).json({
//                     user: user,
//                     message: 'User successfully registered',
//                     sessionToken: `Bearer ${token}`
//                 });
//             }
//         )
//     } catch (err) {
//         if (err instanceof UniqueConstraintError) {
//             res.status(409).json({
//                 message: 'Username or Email already in use',
//             });
//         } else {
//             res.status(500).json({
//                 message: `Failed to register user: ${err}`,
//             });
//         };
//     };
// });

// // Login User
// router.post('/login', async (req, res) => {
//     const {username, password} = req.body.user;
//     try {
//         await models.UsersModel.findOne({
//             where: {
//                 username: username,
//             },
//         })
//         .then(
//             user => {
//                 if (user) {
//                     bcrypt.compare(password, user.password, (err, matches) => {
//                         if (matches) {
//                             let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
//                             res.status(200).json({
//                                 user: user,
//                                 message: 'User successfully logged in!',
//                                 sessionToken: `Bearer ${token}`
//                             })
//                         } else {
//                             res.status(502).send({
//                             message: 'Error: Bad Gateway'
//                             })
//                         }   
//                     })
//                 } else {
//                    res.status(500).send({
//                    message: 'Error: Failed to authenticate'
//                     })
//                 }
//             }
//         )
//     } catch (error) {
//         res.status(501).send({
//             message: `Error: Server does not support this functionality. ${err}`
//         })
//     }
// });

// // Find All Users
// router.get('/userinfo', async (req, res) => {
//     try {
//         await models.UsersModel.findAll({
//             include: [{
//                 model: models.PostsModel,
//                 include: [{
//                     model: models.CommentsModel
//                 }]
//             }],
//             include: [{
//                 model: models.TalesModel,
//                 include: [{
//                     model: models.CommentsModel
//                 }]
//             }],
//             include: [{
//                 model: models.QuestsModel,
//                 include: [{
//                     model: models.CommentsModel
//                 }]
//             }]
//         })
//         .then(
//             users => {
//                 res.status(200).json({
//                     users: users
//                 });
//             }
//         )
//     } catch (err) {
//         res.status(500).json({
//             error: `Failed to retrieve users: ${err}`
//         });
//     };
// });


// module.exports = router;
