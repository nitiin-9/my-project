const { v4: uuidv4 } = require("uuid");
const { body, validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getUsers = async(req, res, next) => {
    let users;
    try {
        users = await User.find({}, "-password");
    } catch (err) {
        const error = new HttpError(" error in fetching users", 500);
        return next(error);
    }
    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async(req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return next(new HttpError("invalid inputs", 422));
    }
    const { name, email, password } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError("error in signup", 500);
        return next(error);
    }
    if (existingUser) {
        const error = new HttpError("user already existed.login ", 422);
        return next(error);
    }
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError("could not create a user", 500);
        console.log('------------>errr', err);
        return next(error);
    }
    const createdUser = new User({
        name,
        email,
        image: req.file.path,
        password: hashedPassword,
        places: [],
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError("error in signing up", 500);
        return next(error);
    }
    let token;
    try {
        token = jwt.sign({ userId: createdUser.id, email: createdUser.email },
            "supersecret_dont_share", { expiresIn: "1h" }
        );
    } catch (err) {
        const error = new HttpError("error in signing up", 500);
        return next(error);
    }
    res
        .status(201)
        .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async(req, res, next) => {
    const { email, password } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError("error in loggin", 500);
        return next(error);
    }
    if (!existingUser) {
        const error = new HttpError(" invalid username or password", 401);
        return next(error);
    }
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        console.log('err in login', err);
        const error = new HttpError("could not log you in Please try again", 500);
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError("could not log you in Please try again", 500);
        return next(error);
    }
    let token;
    try {
        token = jwt.sign({ userId: existingUser.id, email: existingUser.email },
            "secret", { expiresIn: "1h" }
        );
    } catch (err) {
        const error = new HttpError("error in logging in", 500);
        return next(error);
    }
    res.json({
        userId: existingUser.id,
        email: existingUser.email,
        token: token
    });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;