const router        = require('express').Router();

const Skit          = require('../models/skit');
const Actor         = require('../models/actor');

// Fetch All
router.get('/', async(req,res) => {
    const allSkits = await Skit.find({}).sort({'aired.season': 1, 'aired.episode': 1})
    res.json(allSkits);
})

// Post New
router.post('/', async(req,res) => {
    console.log(req.cody)
    try{
        let createdSkit = await Skit.create(req.body);
        for(actor of createdSkit.actors){
            let foundActor = await Actor.findById(actor);
            foundActor.skits.push(createdSkit)
            foundActor.save();
        }
        res.json(createdSkit)

    }catch{error => {
        res.json(error);
        console.log(error);
    }}
})

// Get One
router.get('/:id', (req,res) => {
    Skit.findOne({youtube_id: req.params.id})
        .populate('comments')
        .populate('actors')
        .exec( (error, skit) => {
            if(error || !skit) {
                res.status(404)
                res.json({error: error});
            }else{
                res.json(skit);
            }
        })
})

// Destroy
router.delete('/:id', (req, res) => {
    Skit.findByIdAndRemove(req.params.id, (error) => {
        if(error) {
            res.json(error)
        }else{
            res.json('/skits')
        }
    })
})


module.exports = router;































// const mongoose          = require('mongoose');


// const Actor          = require('../models/actor');
// const middleware    = require('../middleware');

// // Define escapeRegex function for search feature
// function escapeRegex(text) {
//     return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
// };

// // Index
// router.get('/', async(req,res) => {
//     try{
//         if(req.query.search){
//             const regex = new RegExp(escapeRegex(req.query.search), 'gi');
//             let allSkits = await Skit.find({name: regex}).sort({'aired.season': 1, 'aired.episode': 1})
//             res.render("skits/search", {query: req.query.search, skits: allSkits});
//         }else{
//             let allSkits = await Skit.find({}).sort({'aired.season': 1, 'aired.episode': 1})
//             res.render("skits/index", {skits: allSkits});
//         } 
//     }catch{error => console.log(error)}
// })

// // Create
// router.post('/', middleware.isLoggedIn, async(req,res) => {
//     try{
//         const author = {id: req.user._id, username: req.user.username}
//         const newSkit = {...req.body.skit, author}

//         let createdSkit = await Skit.create(newSkit);

//         for(actor of createdSkit.actors){
//             let foundActor = await Actor.findById(actor);
//             foundActor.skits.push(createdSkit)
//             foundActor.save();
//         }

//         res.redirect(`/skits/${createdSkit._id}`);
//     }catch{error => console.log(error)}
// })

// // New 
// router.get('/new', middleware.isLoggedIn, async(req,res) => {
//     try{
//         let actors = await Actor.find({}, {id:1,name:1,team:1})
//         res.render('skits/new', {actors: actors})
//     }catch{error => console.log(error)}
// })

// // Show
// router.get('/:id', (req,res) => {
//     Skit.findById(req.params.id)
//         .populate('comments')
//         .populate('actors')
//         .exec( (error, skit) => {
//             if(error || !skit) {
//                 res.status(404)
//                 res.render('404')
//             }    
//             else res.render('skits/show', {skit: skit})
//          });

// })

// // Edit
// router.get('/:id/edit', middleware.chackSkitOwnership, async(req,res) => {
//     try{
//         let actors = await Actor.find({}, {id:1,name:1,team:1})
//         let foundSkit = await Skit.findById(req.params.id).populate('actors', {id:1});
//         res.render('skits/edit', {skit: foundSkit, allActors: actors})
//     }catch{error => console.log(error)}
// })

// // Update
// router.put('/:id', middleware.chackSkitOwnership, async(req, res) => {
//     try{
//         const id = req.params.id;
//         let skitData = req.body.skit

//         // Remove Skit from Old Actors Objects
//         const oldActors = await Actor.find({ skits: mongoose.Types.ObjectId(id) })
//         for (oldActor of oldActors){
//             const index = oldActor.skits.indexOf(id)
//             if(index > -1){
//                 oldActor.skits.splice(index,1)
//                 await oldActor.save()
//             }
//         }

//         // Update Skit Object
//         if(!skitData.actors) skitData = {...skitData, actors: []}
//         let updatedSkit = await Skit.findByIdAndUpdate(id, skitData, {new: true});

//         // Update New Actor Objects
//         for( actor of updatedSkit.actors ){
//             let foundActor = await Actor.findById(actor)
//             foundActor.skits.addToSet(updatedSkit)
//             await foundActor.save();    
//         }

//         // Go To Skit Page        
//         res.redirect('/skits/' + req.params.id);
        
//     }catch{ error => {
//         console.log(error)
//         res.redirect('/skits')
//     }}
// })

// // Destroy
// router.delete('/:id', middleware.chackSkitOwnership, (req, res) => {
//     Skit.findByIdAndRemove(req.params.id, (error) => {
//         if(error) {
//             console.log(error);
//             res.redirect('/skits')
//         }else{
//             res.redirect('/skits')
//         }
//     })
// })

