const Express = require('express');
const router = Express.Router();
let validateJWT = require('../middleware/validate-jwt');
const {QuestsModel} = require('../models');


router.get('/practice', /*validateJWT,*/ (req, res) => {
    res.send('Hey! This is the practice route for quests!  Good job!') 
});

//* Create
router.post('/create', validateJWT, async (req,res) => {
    const {entry, type, timeLimit} = req.body.quests;
    const {id} = req.user;
    const talesEntry = {
        entry,
        type,
        timeLimit,
        owner: id  
    }

    try{
        const newQuest = await QuestsModel.create(questsEntry);          
        res.status(200).json(newQuest)
    } catch(err) {
        res.status(500).json({
            message: `The quest failed to post: ${err}`});
    }
});


//* Retrieve
router.get('/mine', validateJWT, async (req, res) => {
    let {id} = req.user;
    
    try {
        const userQuests = await QuestsModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userQuests);
    } catch (err) {
        res.status(500).json({error: `A Sea Turtle ate the quests: ${err}`});
    }
});


//* Update
router.put('/update/:entryId', validateJWT, async (req, res) => {
    const {entry, type, timeLimit} = req.body.tales;
    const questId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: questId,
            owner: userId
        }
    };
    const updatedQuest = {
        entry: entry,
        type: type,
        timeLimit: timeLimit
    };

    try {
        const update = await QuestsModel.update(updatedQuest, query);
        res.status(200).json(update);
    } catch(err) {
        res.status(500).json({error: `The quest did not return: ${err}`});
    }

});


//* Delete
router.delete('/delete/:id', validateJWT, async (req, res) => {
    const questId = req.params.id;
    const userId = req.user.id;

    try {
        const query = {
            where: {
                id: questId,
                owner: userId
            }
        };
        await QuestsModel.destroy(query);
        res.status(200).json({message: 'Quest probably completed and was deleted! good job!'});
    } catch(err) {
        res.status(500).json({error: `Quest? There was a quest?: ${err}`});
    }
});

module.exports = router;