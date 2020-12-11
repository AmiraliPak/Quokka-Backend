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
        questionIndex: {
            type: Number
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
        required: [true, 'زمان شروع آزمون مقدار معتبری یاید داشته باشد'],
        default: Date.now()
    }
    //TODO: at pre save we should handel it
    // TODO: check min (starttime+examLength or endDate-startTime)
});

user_examSchema.virtual('endTime').get(async function () {
    if (!this.startTime)
        return this.startTime;

    await this.populate('exam', 'examLength endDate').execPopulate();

    //not sure if it ((always)) works!
    const endTime =
        new Date(this.startTime.getTime() + this.exam.examLength * 60000);

    if (endTime <= this.exam.endDate)
        return endTime;
    return this.exam.endDate;
});

const user_examModel = mongoose.model('UserExam', user_examSchema);
module.exports = user_examModel;