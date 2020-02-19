const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please chceck your data.', 422));
    }

    const {email, password}  = req.body;
    
    let existingUser;

    try{
        existingUser = await User.findOne({email});
    }catch(err){
        return next(new HttpError('Signing up faild, please try again later.', 500));
    }

    if(existingUser) {
        return next(new HttpError('User exists already, please login instead.', 422));
    }

    let hashedPassword;
    
    try{
        hashedPassword = await bcrypt.hash(password, 12);
    }catch(err) {
        return next(new HttpError('Could not create user, please try agian.', 500));
    }

    const createdUser = new User({
        email,
        password: hashedPassword
    })

    try{
        await createdUser.save();
    }catch(err){
        return next(new HttpError('Signing up faild, please try again later.', 500));
    }

    let token;

    try{
        token = jwt.sign({userId: createdUser.id, email: createdUser.email}, process.env.JWT_KEY, {expiresIn: '1h'});
    }catch(err){
        return next(new HttpError('Signing up faild, please try again later.', 500));
    }

    res.status(201).json({userId: createdUser.id, email: createdUser.email, token: token});
}

const login = async (req, res, next) => {
    const {email, password} = req.body;

    let existingUser;

    try{
        existingUser = await User.findOne({email: email});
    }catch(err) {
        return next(new HttpError('Logging in faild, please try again late.', 500));
    }

    if(!existingUser) {
        return next(new HttpError('Invalid credentials, could not log you in.', 403));
    }

    let isValidPassword = false;

    try{
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    }catch(err){
        return next(new HttpError('Could not log you in, please check your credentials and try again.', 500));
    }

    if(!isValidPassword) {
        return next(new HttpError('Invalid credentials, could not log you in.', 403));
    }

    let token;

    try{
        token = jwt.sign({userId: existingUser.id, email: existingUser.email}, process.env.JWT_KEY, {expiresIn: '1h'});
    }catch(err){
        return next(new HttpError('Loggin in faild, please try again later.', 500));
    }

    res.json({userId: existingUser.id, email: existingUser.email, token: token});
}


exports.signup = signup;
exports.login = login;