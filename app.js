const express        = require('express');
const path           = require('path');
const bodyParser     = require('body-parser');
const mongoose       = require('mongoose');
const methodOverride = require('method-override');
const cors           = require('cors');

const Skit      = require('./models/skit');

const Comment   = require('./models/comment');
// const User      = require('./models/user');

skitsRoutes         = require('./routes/skits');
castRoutes          = require('./routes/cast');


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

console.log(path.join(__dirname, './client/build'))

// Routes ----------------------------------------------------------------------
app.use('/api/skits', skitsRoutes);
app.use('/api/cast', castRoutes);
app.get('*', (req, res) => res.sendFile(path.join(__dirname+'/client/build/index.html')));

// Server Listen -----------------------------------------------------------------------

const API_PORT = process.env.PORT || 5000;
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));