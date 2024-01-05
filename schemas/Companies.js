const {Schema, model} = require('mongoose') 

const Companies = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    format: String,
    base: Number,
    coupons: [{
        id: String,
        architecture: String,
        percent: Number
    }],
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    houses: [{
        shortid: String,
        title: String,
        category: String,
        architecture: String,
        photo_url: String,
        cords: {
            lat: Number,
            long: Number
        },
        likes: Number
    }]
})

module.exports = model('Companies', Companies)