const mongoose = require('mongoose');
require('dotenv').config();

// Weekplan Schema
var Schema = mongoose.Schema
const ShoppinglistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    list: [String]
});

const Shoppinglist = module.exports = mongoose.model('Shoppinglist', ShoppinglistSchema);

module.exports.getListByName = function (name, callback) { 
    Shoppinglist.findOne({'name': name}, callback);
};

module.exports.addList = function (newList, callback) {  
    newList.save(callback);
};

module.exports.updateList = function (name, newList, callback) {
    Shoppinglist.findOneAndUpdate({ name: name}, newList, {upsert:true, new:true}, callback);
};