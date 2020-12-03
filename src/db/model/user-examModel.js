const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user_examSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'کاربر باید مقدار معتبری باشد']
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: [true, 'ازمون باید مقدار معتبری داشته باشد']
    },
    answers: [{
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: true
        },
        userAnswer: {
            type: String,
            default: null
        },
        answerGrade: {
            type: Number,
            default: null
        }
    }],
    startTime: {
        type: Date,
        required: [true, 'زمان شروع آزمون مقدار معتبری یاید داشته باشد']
    },
    //TODO: at pre save we should handel it
    // TODO: check min (starttime+examLength or endDate-startTime)
    endTime: {
        type: Date,
    }
});

const user_examModel = mongoose.model('UserExam', user_examSchema);
module.exports = user_examModel;