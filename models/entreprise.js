const mongoose = require("mongoose");



const entrepriseModel = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name:String,
    city:String,
    address:String,
    description:String,
    contact:String,
    image:String,
    location : {
        latitude:String,
        longitude:String,
    },
    region : {
        latitude:String,
        longitude:String,
    },

})

module.exports = mongoose.model('entreprise',entrepriseModel);