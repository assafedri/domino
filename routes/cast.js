const router        = require('express').Router();
const Actor         = require('../models/actor');

router.get('/', async(req,res) => {
    const allCast = await Actor.find({}).sort({'name': 1}).populate('skits')
    res.json(allCast);
})

router.get('/:id', (req,res) => {
    Actor.findById(req.params.id)
        .populate({
            path: 'skits',
            options: {
                sort: {
                    'aired.season': 1,
                    'aired.episode': 1
                }
            }
        })
        .exec( (error, actor) => {
            if(error || !actor) {
                res.json(error);
            }else{
                res.json(actor);
            }
        })
})

module.exports = router;
