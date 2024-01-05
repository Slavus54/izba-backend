const {Schema, model} = require('mongoose') 

const Projects = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    architecture: String,
    century: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    card_number: String,
    total: Number,
    papers: [{
        shortid: String,
        title: String,
        category: String,
        status: String,
        photo_url: String,
        likes: Number
    }],
    questions: [{
        shortid: String,
        name: String,
        text: String,
        format: String,
        level: String,
        answer: String,
        accepted: Boolean
    }],
    events: [{
        shortid: String,
        title: String,
        dateUp: String,
        time: String
    }]
})

module.exports = model('Projects', Projects)