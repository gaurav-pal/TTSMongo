const mongoose = require('mongoose');

const teacherGradeSubjectRateSchema = new mongoose.Schema({
    TeacherId:{
        type:Schema.Types.ObjectId, ref:'Teacher'
        },  
    GradeLevelId:{
        type:Schema.Types.ObjectId, ref:'GradeLevel'
        },  
    SubjectId:{
        type:Schema.Types.ObjectId, ref:'Subject'
        },  
    Rate: [int],
    TeacherGradeSubjectRateDate: [date],
    Active: [bool]
}, { timestamps: true });

const TeacherGradeSubjectRate = mongoose.model('TeacherGradeSubjectRate', teacherGradeSubjectRateSchema);

module.exports = TeacherGradeSubjectRate;
