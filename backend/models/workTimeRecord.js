const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const timeValidate = {
    validator: val =>{
    return /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/.test(val);
    },
    message:  val => val.value + ' is not a valid time format!'
}

const dateValidate = {
    validator: val =>{
    return /([12]\d{3}-([1-9]|1[0-2]))/.test(val);
    },
    message:  val => val.value + ' is not a valid date format!'
}


const workTimeRecord = new Schema({
    employee: {type: Schema.Types.ObjectId, ref: 'Employee'},
    date: {type: String, required: true, validate: { validator: val => dateValidate.validator(val), message: val => dateValidate.message(val)}},
    days: [
        {
            normal: {type: String, validate: { validator: val => timeValidate.validator(val), message: val => timeValidate.message(val)} }, 
            begin: {type: String, validate: { validator: val => timeValidate.validator(val), message: val => timeValidate.message(val)} }, 
            end:  {type: String, validate: { validator: val => timeValidate.validator(val), message: val => timeValidate.message(val)}},
            overtime: {type: String, validate: { validator: val => timeValidate.validator(val), message: val => timeValidate.message(val)}},
            absence: {
                reason: {type: String},
                time: {type: String, validate: { validator: val => timeValidate.validator(val), message: val => timeValidate.message(val)}}
            },
            holiday: {type: Boolean},
            personalExit: {
                begin: {type: String, validate: { validator: val => timeValidate.validator(val), message: val => timeValidate.message(val)}},
                end: {type: String, validate: { validator: val => timeValidate.validator(val), message: val => timeValidate.message(val)}}
            }
        }
    ]
})

module.exports = mongoose.model('WorkTimeRecord', workTimeRecord);