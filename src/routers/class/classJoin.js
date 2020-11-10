const rout = require('express').Router();
const auth = require('../../middelware/auth');
const classModel = require('../../db/model/classModel');

//get info about class search
rout.post('/join', auth, async(req, res) => {
    try {
        const user = req.user;
        const info = req.body;
        if (!info.classId)
            throw { message: "Invalid classId", code: 400 };

        const classToJoin = await classModel.findOne({ classId: info.classId });
        if (!classToJoin)
            throw { message: "Invalid classId", code: 400 };

        if (classToJoin.owner.equals(user._id))
            throw { message: "Owners can't join their own classes", code: 400 };

        const checkUserInClass = classToJoin.members.indexOf(user._id);
        if (checkUserInClass != -1)
            throw { message: "Already joined", code: 400 };

        await classToJoin.members.push(user._id);
        await classToJoin.save();

        res.sendStatus(200);

    } catch (err) {
        if (!err.code)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
});

module.exports = rout;