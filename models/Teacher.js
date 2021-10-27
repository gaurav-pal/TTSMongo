const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    UserID:{
        type:Schema.Types.ObjectId, ref:'User'
        },  
    AboutTeacher: [string],
    Tags: [string],
    Flags: [string],
    TeacherJoinDate: [date],
    Active: [bool]
}, { timestamps: true });


const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
