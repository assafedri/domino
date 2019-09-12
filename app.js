const express        = require('express');
const path           = require('path');
const bodyParser     = require('body-parser');
const mongoose       = require('mongoose');
const methodOverride = require('method-override');
const cors           = require('cors');

const Skit      = require('./models/skit');
const Actor     = require('./models/actor');
const Comment   = require('./models/comment');
// const User      = require('./models/user');


// DB Connection ---------------------------------------------------------------------
mongoose.connect(process.env.DATABASEDB || 'mongodb://localhost/domino', {
    useNewUrlParser: true ,
    useFindAndModify: false ,
    useCreateIndex: true
})
.then( () => console.log('Connected to DB!'))
.catch( error => console.log(`Error: ${error.message}`))


// Express app -----------------------------------------------------------------------
const app = express();
app.use(cors())
// app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express routes ----------------------------------------------------------------------
app.get('/api', async(req,res) => {
    const allSkits = await Skit.find({}).sort({'aired.season': 1, 'aired.episode': 1})
    res.json(allSkits);
})

app.post('/api', async(req,res) => {
    try{
        let createdSkit = await Skit.create(req.body);
        for(actor of createdSkit.actors){
            let foundActor = await Actor.findById(actor);
            foundActor.skits.push(createdSkit)
            foundActor.save();
        }

        res.json(createdSkit)

    }catch{error => console.log(error)}
})

app.get('/api/skits/:id', (req,res) => {
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

app.get('/api/cast', async(req,res) => {
    const allCast = await Actor.find({}).sort({'name': 1}).populate('skits')
    res.json(allCast);
})

app.get('/api/cast/:id', (req,res) => {
    Actor.findById(req.params.id)
        .populate('skits')
        .exec( (error, actor) => {
            if(error || !actor) {
                res.status(404)
            }else{
                res.json(actor);
            }
        })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/public/index.html'));
});


// Server Listen -----------------------------------------------------------------------

const API_PORT = process.env.PORT || 5000;
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));