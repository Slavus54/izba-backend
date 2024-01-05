const {Schema, model} = require('mongoose') 

const Profiles = new Schema({
    account_id: String,
    username: String,
    security_code: String,
    telegram_tag: String,
    architecture: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    main_photo: String,
    works: [{
        shortid: String,
        text: String,
        category: String,
        level: String,
        photo_url: String,
        dateUp: String,
        likes: Number
    }],
    account_components: [{
        shortid: String,
        title: String,
        path: String
    }]
})

module.exports = model('Profiles', Profiles)