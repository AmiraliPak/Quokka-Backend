const rout = require('express').Router();
const userExamModel = require('../../db/model/user-examModel');
const auth = require('../../middelware/auth');
const uploadAnswer = require('../../middelware/exam/fileUploadingExam');
const checkExamId = require('../../middelware/exam/checkExamId');
const checkClassAccess = require('../../middelware/class/checkClassAccess');
const checkExamTime = require('../../middelware/exam/checkExamTime');
const checkQuestionIndex = require('../../middelware/exam/checkQuestionIndex');


rout.post('/:examId/questions/:questionIndex/answer', auth, checkExamId, checkClassAccess, checkExamTime, checkQuestionIndex, uploadAnswer.single('answer'), async(req, res) => {
    try {
        const answerFile = req.fileName;
        const answerText =  req.query.answer;
        // TODO: check exam and question to save answer path
        if (!answerFile && !answerText) {
            res.status(400).json({ "error": "مشکلی رخ داده است" });
            return;
        }

        const { questionObj, user_exam, user_examEndTime } = req;

        const foundAnswer = user_exam.answers.find(answer => answer.questionIndex == questionObj.index);
        if (!foundAnswer) {
            const newAnswer = {
                questionIndex: questionObj.index,
                answerGrade: null
            };
            if (answerText)
                newAnswer.answerText = answerText;
            if (answerFile)
                newAnswer.answerFile = answerFile;
            user_exam.answers.push(newAnswer);

        } else {
            if (answerText)
                foundAnswer.answerText = answerText;
            if (answerFile)
                foundAnswer.answerFile = answerFile;
        }
        await user_exam.save();
        res.status(200).json({ answerText: foundAnswer.answerText, answerFile: foundAnswer.answerFile, user_examEndTime });

    } catch (e) {
        res.json(e);
    }
});
rout.delete('/:examId/questions/:questionIndex/answer', auth, checkExamId, checkClassAccess, checkExamTime, checkQuestionIndex, async (req, res) => {
    try {
        const { questionObj, user_exam, user_examEndTime } = req;
        const { deleteFile, deleteText } = req.query;

        const foundAnswer = user_exam.answers.find(answer => answer.questionIndex == questionObj.index);
        if (!foundAnswer)
            throw { message: "جوابی برای حذف وجود ندارد", code: 400 };

        let isDeleted = false;
        if (deleteFile == 'true') {
            foundAnswer.answerFile = null;
            isDeleted = true;
        }
        //TODO: delete the file from folder

        if (deleteText == 'true') {
            foundAnswer.answerText = null;
            isDeleted = true;
        }

        await user_exam.save();

        if (!isDeleted)
            throw { message: "deleteText & deleteFile are both false", code: 400 };

        res.status(200).json({ answerText: foundAnswer.answerText, answerFile: foundAnswer.answerFile, user_examEndTime });

    } catch (err) {
        if (!err.code || err.code >= 600)
            err.code = 400;
        res.status(err.code).json({ error: err.message });
    }
});
module.exports = rout;