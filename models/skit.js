const mongoose = require('mongoose');

const skitSchema =  new mongoose.Schema({
    name: String,
    youtube_id: String,
    thumbnail: String,
    description: String,
    aired: { season: Number, episode: Number},
    actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
    // characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    author: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },    
        username: String
    }
})

module.exports = mongoose.model("Skit", skitSchema);