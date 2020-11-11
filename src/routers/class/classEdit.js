const rout = require('express').Router();
const auth = require('../../middelware/auth');
//const classModel = require('../../db/model/classModel');
const checkClassAdmin = require('../../middelware/checkClassAdmin');

rout.put('/:classId', auth, checkClassAdmin, async (req, res) => {
    try {
        //const user = req.user;
        const newInfo = req.body;
        const classToEdit = req.ownedClass;//await classModel.findOne({ classId: req.params.classId });

        //if (!classToEdit)
        //    throw { message: "Invalid classId", code: 400 };

        //if (!user._id.equals(classToEdit.owner))
        //    throw { message: "Permission denied", code: 403 };

        if (Object.keys(newInfo).length == 0)
            throw { message: "Request body is empty", code: 400 };

        const canUpdate = ['name', 'description'];
        canUpdate.forEach(property => {
            if (newInfo[property])
                classToEdit[property] = newInfo[property];
        });
        await classToEdit.save();
        res.status(200).json({ editedClass: classToEdit });

    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
});
module.exports = rout;