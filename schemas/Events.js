const {Schema, model} = require('mongoose') 

const Events = new Schema({
    shortid: String,
    project_id: String,
    username: String,
    title: String,
    category: String,
    level: String,
    steps: [{
        id: String,
        text: String,
        role: String,
        priority: Number
    }],
    volume: Number,
    dateUp: String,
    time: String,
    done: Boolean,
    members: [{
        username: String,
        telegram_tag: String,
        role: String
    }],
    results: [{
        shortid: String,
        name: String,
        text: String,
        rate: Number,
        photo_url: String,
        likes: Number
    }]
})

module.exports = model('Events', Events)