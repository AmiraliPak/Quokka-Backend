const auth = require('../../middelware/auth');
const User = require('../../db/model/userModel');
const rout = require('express').Router();
const { deleteUserMailOptions } = require('../../functions/mailer');

//user delete account
rout.delete('/delete', auth, async (req, res) => {
    try {
        const user = req.user;

        await User.deleteOne(user, (err) => {
            if (err)
                res.status(503).json({ err });
        });

        user.sendMail(deleteUserMailOptions);

        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});

module.exports = rout;