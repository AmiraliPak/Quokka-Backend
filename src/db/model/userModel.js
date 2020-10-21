const mongoose = require('mongoose');
const validator = require("validator");
const jwt = require('jsonwebtoken');
const constants = require('../../../constants');
const Schema = mongoose.Schema;
// create user schema
const userSchema = new Schema({
    firstname: {
        type: String,
        require: true,
        minlength: 4,
    },
    lastname: {
        type: String,
        require: true,
        minlength: 4,
    },
    username: {
        type: String,
        unique: true,
        require: true,
        minlength: 6
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                return new Error("email not valid");
            }
        },
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
    },
    birthday: {
        type: Date,
    },
    avatar: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]

}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
});

//methodes

// create token
userSchema.methods.genrateAuth = async function() {
    const user = this;
    const token = await jwt.sign({
        _id: user._id.toString()
    }, constants.jwtSecret);
    // add to user token
    user.tokens = user.tokens.constants({
        token
    });
    await user.save();
    return token;
};

// methode for returning json object
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.createdAt;
    delete userObject.updatedAt;

    return userObject;
};

// create the user model
const User = mongoose.model('User', userSchema);
module.exports = User;