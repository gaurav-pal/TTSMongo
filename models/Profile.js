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
    IsTeacher:{
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    IsStudent:{
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    IsTeacherApproved: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    IsStudentApproved: {
        type: mongoose.Schema.Types.Boolean,
        default: true
    }
}, { timestamps: true });


const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
