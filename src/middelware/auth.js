const jwt = require('jsonwebtoken');
const User = require('../db/model/userModel');
const constants = require('../../constants');

// create auth function for using as middelware to check auth
const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = await jwt.verify(token, constants.jwtSecret);
        const user = await User.findOne({
            _id: decoded._id,
            'tokens.token': token
        });
        if (!user) throw new Error('not found');

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        // console.log(e);
        throw new Error(e);
    }
};

module.exports = auth;