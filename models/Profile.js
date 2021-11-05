const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    UserID:{
        type:mongoose.Schema.Types.ObjectId, ref:'User'
        },  
    About: mongoose.Schema.Types.String,
    Flags: mongoose.Schema.Types.String,
    JoinDate: {
        type: mongoose.Schema.Types.Date,
        default: () => Date.now() 
    },
    Address: mongoose.Schema.Types.String,
    City: mongoose.Schema.Types.String,
    State: mongoose.Schema.Types.String,
    ZipCode: mongoose.Schema.Types.String,
    TeacherActive: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    StudentActive: {
        type: mongoose.Schema.Types.Boolean,
        default: true
    },

    TeacherProfile:[{
        GradeLevel:mongoose.Schema.Types.String,  
        Subject:mongoose.Schema.Types.String,  
        Rate: mongoose.Schema.Types.Number,
        Comments:mongoose.Schema.Types.String,
        TeacherGradeSubjectRateDate: mongoose.Schema.Types.Date,
        Active: mongoose.Schema.Types.Boolean
    }],

    StudentProfile:[{
        GradeLevel:mongoose.Schema.Types.String,  
        Subject:mongoose.Schema.Types.String,
        Comments:mongoose.Schema.Types.String,
        Active: mongoose.Schema.Types.Boolean
        }],

}, { timestamps: true });


const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
