const router = require('express').Router();
const {models} = require('../models');

// Test
router.get('/practice', (req, res) => {
    res.send('Hey! This is the practice route for quests!  Good job!') 
});

//* Create
router.post('/create', async (req,res) => {
    const {entry, type, timeLimit} = req.body.quests;
    try{
        await models.QuestsModel.create({
            entry: entry,
            type: type,
            timeLimit: timeLimit,
            userId: req.user.id 
        })
        .then(
            quest => {         
                res.status(201).json({
                    quest: quest,
                    message: 'quest created'
                });
            }
        )
    } catch(err) {
        res.status(500).json({
            message: `The quest failed to post: ${err}`
        });
    };
    // QuestsModel.create(questsEntry)
});


//* Retrieve
router.get('/mine', async (req, res) => {    
    try {
        await models.QuestsModel.findAll({
            where: {
                userId: req.user.id
            }
        })
        .then (
            quests => {
                res.status(200).json({
                    userQuests: quests,
                    message: 'All quests retrieved'
                });
            }
        )
    } catch (err) {
        res.status(500).json({error: `A Sea Turtle ate the quests: ${err}`});
    }
});


//* Update      -FYI: the 'id' is the long uuid# associated with the post
router.put('/update/:id', async (req, res) => {
    const {entry, type, timeLimit} = req.body.quests;
    const query = {
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    };
    const updatedQuest = {
        entry: entry,
        type: type,
        timeLimit: timeLimit
    };
    try {
        await models.QuestsModel.update(updatedQuest, query);
        res.status(200).json({
            message: 'quest updated',
            updatedQuest
        });
    } catch(err) {
        res.status(500).json({error: `The quest did not return: ${err}`});
    }
});


//* Delete      -FYI: the 'id' is the long uuid# associated with the post
router.delete('/delete/:id', async (req, res) => {
    const query = {
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    };
    try {
        await models.QuestsModel.destroy(query)
        res.status(200).json({message: 'Quest probably completed and was deleted! good job!'});
    } catch(err) {
        res.status(500).json({error: `Quest? There was a quest?: ${err}`});
    }
});

module.exports = router;

// Orig
// const Express = require('express');
// const router = Express.Router();
// let validateJWT = require('../middleware/validate-jwt');
// const {QuestsModel} = require('../models');


// router.get('/practice', /*validateJWT,*/ (req, res) => {
//     res.send('Hey! This is the practice route for quests!  Good job!') 
// });

// //* Create
// router.post('/create', validateJWT, async (req,res) => {
//     const {entry, type, timeLimit} = req.body.quests;
//     const {id} = req.user;
//     const questsEntry = {
//         entry,
//         type,
//         timeLimit,
//         owner: id  
//     }

//     try{
//         const newQuest = await QuestsModel.create(questsEntry);          
//         res.status(200).json(newQuest)
//     } catch(err) {
//         res.status(500).json({
//             message: `The quest failed to post: ${err}`});
//     }
//     // QuestsModel.create(questsEntry)
// });


// //* Retrieve
// router.get('/mine', validateJWT, async (req, res) => {
//     let {id} = req.user;
    
//     try {
//         const userQuests = await QuestsModel.findAll({
//             where: {
//                 owner: id
//             }
//         });
//         res.status(200).json(userQuests);
//     } catch (err) {
//         res.status(500).json({error: `A Sea Turtle ate the quests: ${err}`});
//     }
// });


// //* Update
// router.put('/update/:entryId', validateJWT, async (req, res) => {
//     const {entry, type, timeLimit} = req.body.quests;
//     const questId = req.params.entryId;
//     const userId = req.user.id;

//     const query = {
//         where: {
//             id: questId,
//             owner: userId
//         }
//     };
//     const updatedQuest = {
//         entry: entry,
//         type: type,
//         timeLimit: timeLimit
//     };

//     try {
//         const update = await QuestsModel.update(updatedQuest, query);
//         res.status(200).json(update);
//     } catch(err) {
//         res.status(500).json({error: `The quest did not return: ${err}`});
//     }

// });


// //* Delete
// router.delete('/delete/:id', validateJWT, async (req, res) => {
//     const questId = req.params.id;
//     const userId = req.user.id;

//     try {
//         const query = {
//             where: {
//                 id: questId,
//                 owner: userId
//             }
//         };
//         await QuestsModel.destroy(query);
//         res.status(200).json({message: 'Quest probably completed and was deleted! good job!'});
//     } catch(err) {
//         res.status(500).json({error: `Quest? There was a quest?: ${err}`});
//     }
// });

// module.exports = router;