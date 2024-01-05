const {Schema, model} = require('mongoose') 

const Tools = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    description: String,
    category: String,
    format: String,
    electric: Boolean,
    url: String,
    main_photo: String,
    reviews: [{
        shortid: String,
        name: String,
        text: String,
        criterion: String,
        period: String,
        rating: Number
    }],
    offers: [{
        shortid: String,
        name: String,
        marketplace: String,
        cost: Number,
        cords: {
            lat: Number,
            long: Number
        },
        likes: Number
    }]
})  

module.exports = model('Tools', Tools)