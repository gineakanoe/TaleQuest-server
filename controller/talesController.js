const router = require('express').Router();
const {models} = require('../models');

// Test
router.get('/practice', (req, res) => {
    res.send('Hey! This is the practice route for tales!  Good job!') 
});

//* Create
router.post('/create', async (req,res) => {
    const {title, entry, genre, keywords} = req.body.tales;
    try{
        await models.TalesModel.create({
            title: title,
            entry: entry,
            genre: genre,
            keywords: keywords,
            userId: req.user.id
        })
        .then (
            tale => {
                res.status(201).json({
                    tale: tale,
                    message: 'tale created'
                });
            }
        )          
    } catch(err) {
        res.status(500).json({
            message: `The tale failed to post: ${err}`
        });
    };
    // TalesModel.create(talesEntry)
});


//* Retrieve
router.get('/mine', async (req, res) => {    
    try {
        await models.TalesModel.findAll({
            where: {
                userId: req.user.id
            }
        })
        .then (
            tales => {
                res.status(200).json({
                    userTales: tales,
                    message: 'All tales retrieved'
                });
            }
        )
    } catch (err) {
        res.status(500).json({error: err});
    }
});


//* Update      -FYI: the 'id' is the long uuid# associated with the post
router.put('/update/:id', async (req, res) => {
    const {title, entry, genre, keywords} = req.body.tales;      
    const query = {
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    };
    const updatedTale = {
        title: title,
        entry: entry,
        genre: genre,
        keywords: keywords
    };
    try {
        await models.TalesModel.update(updatedTale, query)
            res.status(200).json({
                message: 'tale updated',
                updatedTale
            });        
    } catch(err) {
        res.status(500).json({error: err});
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
        await models.TalesModel.destroy(query)
            res.status(200).json({message: 'Tale Removed'});
    } catch(err) {
        res.status(500).json({error: err});
    }
});


module.exports = router;


// Orig
// const Express = require('express');
// const router = Express.Router();
// let validateJWT = require('../middleware/validate-jwt');
// const {TalesModel} = require('../models');

// router.get('/practice', validateJWT, (req, res) => {
//     res.send('Hey! This is the practice route for tales!  Good job!') 
// });

// //* Create
// router.post('/create', validateJWT, async (req,res) => {
//     const {title, entry, genre, keywords} = req.body.tales;
//     const {id} = req.user;
//     const talesEntry = {
//         title,
//         entry,
//         genre,
//         keywords,
//         owner: id  
//     }

//     try{
//         const newTale = await TalesModel.create(talesEntry);          
//         res.status(200).json(newTale)
//     } catch(err) {
//         res.status(500).json({
//             message: `The tale failed to post: ${err}`});
//     }
//     // TalesModel.create(talesEntry)
// });


// //* Retrieve
// router.get('/mine', validateJWT, async (req, res) => {
//     let {id} = req.user;
    
//     try {
//         const userTales = await TalesModel.findAll({
//             where: {
//                 owner: id
//             }
//         });
//         res.status(200).json(userTales);
//     } catch (err) {
//         res.status(500).json({error: err});
//     }
// });


// //* Update
// router.put('/update/:entryId', validateJWT, async (req, res) => {
//     const {title, entry, genre, keywords} = req.body.tales;
//     const taleId = req.params.entryId;
//     const userId = req.user.id;

//     const query = {
//         where: {
//             id: taleId,
//             owner: userId
//         }
//     };
//     const updatedTale = {
//         title: title,
//         entry: entry,
//         genre: genre,
//         keywords: keywords
//     };

//     try {
//         const update = await TalesModel.update(updatedTale, query);
//         res.status(200).json(update);
//     } catch(err) {
//         res.status(500).json({error: err});
//     }

// });


// //* Delete
// router.delete('/delete/:id', validateJWT, async (req, res) => {
//     const taleId = req.params.id;
//     const userId = req.user.id;

//     try {
//         const query = {
//             where: {
//                 id: taleId,
//                 owner: userId
//             }
//         };
//         await TalesModel.destroy(query);
//         res.status(200).json({message: 'Tale Removed'});
//     } catch(err) {
//         res.status(500).json({error: err});
//     }
// });


// module.exports = router;