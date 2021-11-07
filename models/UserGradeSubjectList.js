const mongoose = require('mongoose');

const UserGradeSubjectListSchema = new mongoose.Schema({
    UserID:{
        type:mongoose.Schema.Types.ObjectId, ref:'User'
        }, 
    GradeLevel:mongoose.Schema.Types.String,  
    Subject:mongoose.Schema.Types.String,  
    Rate: mongoose.Schema.Types.Number,
    Comments:mongoose.Schema.Types.String,
    IsTeacherDocument: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    TeacherGradeSubjectRateDate: {
        type: mongoose.Schema.Types.Date,
        default: () => Date.now() 
    },
    Active: mongoose.Schema.Types.Boolean
}, { timestamps: true });

UserGradeSubjectListSchema
    .index(
        { 
            UserID: 1, 
            GradeLevel: 1, 
            Subject: 1,  
            IsTeacherDocument: 1
        }, { unique: true });

const UserGradeSubjectList = mongoose.model('UserGradeSubjectList', UserGradeSubjectListSchema);

module.exports = UserGradeSubjectList;
