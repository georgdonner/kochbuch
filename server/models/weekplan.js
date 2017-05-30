const mongoose = require('mongoose');
require('dotenv').config();

// Weekplan Schema
var Schema = mongoose.Schema
const WeekplanSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    plan: [{
        recipe: {
            id: String,
            title: String
        },
        custom: String,
        date: Date,
        servings: Number,
        time: String
    }]
});

const Weekplan = module.exports = mongoose.model('Weekplan', WeekplanSchema);

module.exports.getPlanByName = function (name, callback) { 
    Weekplan.findOne({'name': name}, callback);
};

module.exports.addPlan = function (newPlan, callback) {  
    newPlan.save(callback);
};

module.exports.updatePlan = function (name, newPlan, callback) {
    Weekplan.findOneAndUpdate({ name: name}, newPlan, {upsert:true, new:true}, callback);
};