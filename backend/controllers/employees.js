const {validationResult} = require('express-validator');

const HttpError = require('../models/http-error');
const Employee = require('../models/employee');

const getEmployees = async (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;

    let employees;

    let find = {
            name: { $regex: '.*' + (req.query.name  || '') + '.*' }, 
            surname: { $regex: '.*' + (req.query.surname || '') + '.*' }, 
            position: { $regex: '.*' + (req.query.position || '') + '.*' }
        };

    console.log(find);

    try{
        const employeesPromise = Employee.find(find).skip(pageSize * (currentPage - 1)).limit(pageSize);
        const countEmployeesPromise = Employee.countDocuments(find);
        employees = await Promise.all([employeesPromise, countEmployeesPromise]);
    }catch(err){
        return next(new HttpError('Fetching employees faild, please try again later.', 500));
    }

    res.json({employees: employees[0].map(e => e.toObject({getters: true})), amount: employees[1]});
}

const getEmployee = async (req, res, next) => {
    const employeeId = req.params.eid;
    let employee;


    try{
        employee = await Employee.findById(employeeId);
    }catch(err){
        return next( new HttpError('Fetching employee failed, please try again later.', 500));
    }

    if(!employee) {
        return next(new HttpError('Could not find a employee for the provided id.', 404));
    }

    res.json({employee: employee.toObject({getters: true}) });
} 

const createEmployee = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const {name, surname, position} = req.body;

    const createdEmployee = new Employee({
        name,
        surname,
        position,
        workTimeRecords: []
    });

    try{
        await createdEmployee.save();
    }catch(err){
        return next(new HttpError('Creating employee failed, please try again.', 500));  
    }

    res.status(201).json({employee: createdEmployee.toObject({getters: true})}); 
} 

const updateEmployee = async (req, res, next) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { name, surname, position} = req.body;

    const employee = new Employee({
        _id: req.params.eid,
        name,
        surname,
        position
    });

    let updateResult;

    try{
        updateResult = await Employee.updateOne({_id: req.params.eid}, employee);
    }catch(err){
        return next(new HttpError('Couldnt update employee!', 500));
    }
    
    if(updateResult.n > 0) {
        res.status(200).json({message: "Update successful!", employee: employee.toObject({getters: true})});
    }else{
        return next(new HttpError('Not authorized!', 401));
    }
} 

const deleteEmployee =  async (req, res, next) => {
    let deleteResult;

    try{
        deleteResult = await Employee.deleteOne({ _id: req.params.eid});
    }catch(err){
        return next(new HttpError('Couldnt delete employee.', 500));
    }

    if(deleteResult.n > 0) {
        res.status(200).json({message: "Employee deleted!"});
    }else{
        return next(new HttpError('Not authorized!', 401));
    }
}

exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;
exports.createEmployee = createEmployee;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;