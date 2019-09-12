const mongoose = require("mongoose");
 
const actorShema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    team: String,
    skits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skit'
    }],
    author: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },    
        username: String
    }
});
 
module.exports = mongoose.model("Actor", actorShema);