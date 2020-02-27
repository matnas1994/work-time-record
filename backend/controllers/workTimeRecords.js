const mongoose = require('mongoose');
const {validationResult} = require('express-validator');
const moment = require('moment')

const HttpError = require('../models/http-error');
const WorkTimeRecord = require('../models/workTimeRecord');
const Employee = require('../models/employee');

const getWorkTimeRecords = async (req, res, next) => {
    const { employeeId, date }= req.query;
    let dateQuery = {};
    
    if (/([12]\d{3}-([1-9]|1[0-2]))/.test(date)) {
        dateQuery.date = date;
    }

    if(employeeId) {
        dateQuery.employee = employeeId;
    }

    let workTimeRecords;
    try{
        workTimeRecords = await WorkTimeRecord.findOne(dateQuery);
    }catch(err){
        return next(new HttpError('Something went wrong, could not find a work time records.', 500));
    }

    if(!workTimeRecords || workTimeRecords.length === 0){
        return next(new HttpError('Could not find a work time records.', 404));
    } 

    res.status(200).json({workTimeRecords: workTimeRecords.toObject({getters: true})}); 
}

const createOrUpadateWorkTimeRecords = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const {employeeId, date, days} = req.body;

    console.log(days);

    const createdWorkTimeRecord = new WorkTimeRecord({
        employee: employeeId,
        date: date,
        days: days
    });

    //console.log(createdWorkTimeRecord);

    let employee;
    
    try{
        employee = await Employee.findById(employeeId);
    }catch(err){
        console.log(err);
        return next(new HttpError('Creating work time record failed, please try again.', 500));
    }

    if(!employee){
        return next(new HttpError('Could not find employee for provided id.', 404));
    }

    await WorkTimeRecord.findOne({date, employee: employeeId}, async (err, data) => {
        if(!data || data.length === 0){
            try{
                const sess = await mongoose.startSession();
                sess.startTransaction();
                await createdWorkTimeRecord.save({session: sess});
                employee.workTimeRecords.push(createdWorkTimeRecord);
                await employee.save({session: sess});
                await sess.commitTransaction();
            }catch(err){
                return next(new HttpError('Creating work time record failed, please try again.', 500)); 
            }
        }else{
            try{
                data.days = days;
                data.save();
            }catch(err){
                return next(new HttpError('Couldnt update employee!', 500));
            }
        }
    });

    res.status(201).json({workTimeRecord: createdWorkTimeRecord.toObject({getters: true})}); 
}

const deleteWorkTimeRecord = async (req, res, next) => {
    const id = req.params.id;
    let workTimeRecord;
    try{
        workTimeRecord = await WorkTimeRecord.findById(id).populate('employee');
    }catch(error){
        return next(new HttpError('Something went wrong, could not delete work time record.', 500));
    }

    if(!workTimeRecord) {
        return next(new HttpError('Could not find work time record for this id.', 404));
    }

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        workTimeRecord.employee.workTimeRecords.pull(workTimeRecord);
        await workTimeRecord.remove({ session: sess});
        await workTimeRecord.employee.save({session: sess});
        await sess.commitTransaction();
    }catch(err) {
        return next(new HttpError('Something went wrong, could not delete work time record.', 500));
    }

    res.status(200).json({message: "Deleted work time record."}); 
}

exports.getWorkTimeRecords = getWorkTimeRecords;
exports.createOrUpadateWorkTimeRecords = createOrUpadateWorkTimeRecords;
exports.deleteWorkTimeRecord = deleteWorkTimeRecord;