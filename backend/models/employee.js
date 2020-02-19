const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    position: {type: String, required: true},
    workTimeRecords : [{type: Schema.Types.ObjectId, ref: 'WorkTimeRecord'}]
})

module.exports = mongoose.model('Employee', userSchema);