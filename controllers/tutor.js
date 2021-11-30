const { promisify } = require('util');
const crypto = require('crypto');
//const nodemailer = require('nodemailer');
//const nodemailerSendgrid = require('nodemailer-sendgrid');
//const passport = require('passport');
const _ = require('lodash');
const validator = require('validator');
//const mailChecker = require('mailchecker');
const Subject = require('../models/Subject');
const GradeLevel = require('../models/GradeLevel');
const Profile = require('../models/Profile');
const UserGradeSubjectList = require('../models/UserGradeSubjectList');
const UserList = require('../models/User');
const { Console } = require('console');
const { fstat } = require('fs');
const { forEach } = require('lodash');

const randomBytesAsync = promisify(crypto.randomBytes);

exports.getSearch = (req, res) => {
  Subject.find({ "Active": true }, '_id Name', {sort: { DisplaySeq : 1}}, function(err0, allSubjects) {
      if (err0) {
          console.log(err0);
      } else {
        GradeLevel.find({ "Active": true }, '_id Name', {sort: { DisplaySeq : 1}}, function(err1, allGradeLevels) {
            if (err1) {
                console.log(err1);
            } else {
                res.render('tutor/Search', {
                    title: '4 Step Process',
                    gradeLevels : allGradeLevels,
                    subjectList: allSubjects,
                });
            }
          });    
      }
    });  
};

exports.postSearch = (req, res, next) => {
  // const validationErrors = [];
  // if (validator.isEmpty(req.body.Subject)) validationErrors.push({ msg: 'Please select a subject.' });
  // if (validator.isEmpty(req.body.GradeLevel)) validationErrors.push({ msg: 'Please select a grade level.' });

  // if (validationErrors.length) {
  //   req.flash('errors', validationErrors);
  //   return res.redirect('tutor/search');
  // }
  var TeachersList = [];
  UserGradeSubjectList.aggregate([
        {$match:{"Active": true , "IsTeacherDocument": true, "GradeLevel": req.body.GradeLevel, "Subject": req.body.Subject}},
        {$lookup: {from: "profiles",localField: "UserID",foreignField: "UserID",as: "prfs"}},
        {$unwind :"$prfs"},
        {$lookup: {from: "users",localField: "UserID",foreignField: "_id",as: "usr"}},
        {$unwind :"$usr"},
    ],
    function( error, uL ) {
      if (error) {
        console.log(error);
        return;
      }
        uL.forEach(function(x){
          const size = 200;
          var Grvtr = "";
          if (!x.usr.email) Grvtr =  `https://gravatar.com/avatar/?s=${size}&d=retro`;
          else{
            const md5 = crypto.createHash('md5').update(x.usr.email).digest('hex');
            Grvtr = `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
          }
          var display = {
            Name: x.usr.profile.name, 
            Rate: x.Rate, 
            Gender: x.usr.profile.gender, 
            About: x.prfs.About , 
            SubjectComment : x.Comments, 
            Picture: x.usr.profile.picture, 
            Gravatar: Grvtr};
          for(i=0;i<5;i++){
              TeachersList.push(display);
      }                    
    });
    res.render('tutor/TeacherListForSearch', {
      title: 'Teacher List For Search',
      TeachersList : TeachersList
    });  
  });
};

exports.TeacherProfile = (req, res, next) => {  
  var query = {
      UserID: req.user.id
    },
    update = { 
      UserID: req.user.id,
      Flags:"",
      IsTeacher:true
    },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };
  Profile.findOneAndUpdate(query, update, options, function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    res.render('tutor/TeacherProfile', {
      title: 'Teacher\'s Profile',
      profile: result
    });
  });  
};

exports.PostTeacherProfile = (req, res, next) => { 
  var query = {
      UserID: req.user.id
    },
    update = { 
      UserID: req.user.id,
      About: req.body.About,
      Address: req.body.Address,
      City: req.body.City,
      State: req.body.State,
      ZipCode: req.body.ZipCode,      
      IsTeacher:true
    },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };
  Profile.findOneAndUpdate(query, update, options, function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    res.render('tutor/TeacherProfile', {
      title: 'Teacher\'s Profile',
      profile: result
    });
  });
};

exports.GetTeacherGradeSubject = async (req, res, next) => {
  UserGradeSubjectList.find({UserID: req.user.id, IsTeacherDocument: true})
    .exec(function(err0, items) {
      res.json(items);
    });
};

exports.PostTeacherGradeSubject = (req, res) => {  
  var TgsVariable = req.body.item;
  
  var TeacherGradeSubject = { 
    UserID: req.user.id,
    GradeLevel:TgsVariable.GradeLevel,  
    Subject:TgsVariable.Subject,  
    Rate: TgsVariable.Rate,
    Comments:TgsVariable.Comments,
    Active:TgsVariable.Active,
    IsTeacherDocument: true
  };

  UserGradeSubjectList.create(TeacherGradeSubject, function (err, doc) {
    if (err) console.log("Something wrong when updating data!");
    res.json(doc);
  });
};

exports.PutTeacherGradeSubject = (req, res, next) => {
  var TgsVariable = req.body.item;
  var query = {
    _id: TgsVariable._id
    };
  
  var TeacherGradeSubject = { 
    GradeLevel:TgsVariable.GradeLevel,  
    Subject:TgsVariable.Subject,  
    Rate: TgsVariable.Rate,
    Comments:TgsVariable.Comments,
    Active:TgsVariable.Active,
    IsTeacherDocument: true
  };

  UserGradeSubjectList.findOneAndUpdate( query, 
    TeacherGradeSubject,
    {
      new: true
    },
    (err, doc) => {
      if (err) {
          console.log("Something wrong when updating data!");
      }
      res.json(doc);
    });
};

exports.DeleteTeacherGradeSubject = (req, res) => {
  var TgsVariable = req.body.item;
  UserGradeSubjectList.deleteOne({ _id: TgsVariable._id}, {}, function(err, item) {
      res.json(item);
  });
};

exports.GetAllSubjects = async (req, res, next) => {
  Subject.find({Active: true}, '_id Name', {sort: {DisplaySeq: 1}})
  .exec(function(err0, items) {
    res.json(items);
  });
};

exports.GetAllGradelevels = async (req, res, next) => {
  GradeLevel.find({Active: true}, '_id Name', {sort: { DisplaySeq : 1}})
  .exec(function(err0, items) {
    res.json(items);
  });
};

exports.StudentProfile = (req, res, next) => {
  var query = {
    UserID: req.user.id
  },
  update = { 
    UserID: req.user.id,
    Flags:"",
    IsStudent:true
  },
  options = { upsert: true, new: true, setDefaultsOnInsert: true };
  Profile.findOneAndUpdate(query, update, options, function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    res.render('tutor/StudentProfile', {
      title: 'Student\'s Profile',
      profile: result
    });
  });  
};

exports.PostStudentProfile = (req, res, next) => { 
  var query = {
      UserID: req.user.id
    },
    update = { 
      UserID: req.user.id,
      About: req.body.About,
      Address: req.body.Address,
      City: req.body.City,
      State: req.body.State,
      ZipCode: req.body.ZipCode,      
      IsStudent:true
    },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };
  Profile.findOneAndUpdate(query, update, options, function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    res.render('tutor/StudentProfile', {
      title: 'Student\'s Profile',
      profile: result
    });
  });
};

exports.GetStudentGradeSubject = async (req, res, next) => {
  UserGradeSubjectList.find({UserID: req.user.id, IsTeacherDocument: false})
    .exec(function(err0, items) {
      res.json(items);
    });
};

exports.PostStudentGradeSubject = (req, res) => {  
  var TgsVariable = req.body.item;
  
  var TeacherGradeSubject = { 
    UserID: req.user.id,
    GradeLevel:TgsVariable.GradeLevel,  
    Subject:TgsVariable.Subject,  
    Rate: 0,
    Comments:TgsVariable.Comments,
    Active:TgsVariable.Active,
    IsTeacherDocument: false
  };

  UserGradeSubjectList.create(TeacherGradeSubject, function (err, doc) {
    if (err) console.log("Something wrong when updating data!");
    res.json(doc);
  });
};

exports.PutStudentGradeSubject = (req, res, next) => {
  var TgsVariable = req.body.item;
  var query = {
    _id: TgsVariable._id
    };
  
  var TeacherGradeSubject = { 
    GradeLevel:TgsVariable.GradeLevel,  
    Subject:TgsVariable.Subject,  
    Rate: 0,
    Comments:TgsVariable.Comments,
    Active:TgsVariable.Active,
    IsTeacherDocument: false
  };

  UserGradeSubjectList.findOneAndUpdate( query, 
    TeacherGradeSubject,
    {
      new: true
    },
    (err, doc) => {
      if (err) {
          console.log("Something wrong when updating data!");
      }
      res.json(doc);
    });
};

exports.DeleteStudentGradeSubject = (req, res) => {
  var TgsVariable = req.body.item;
  UserGradeSubjectList.deleteOne({ _id: TgsVariable._id}, {}, function(err, item) {
      res.json(item);
  });
};

























var getClientFilter = function(query) {
    var result = {
        Name: new RegExp(query.Name, "i"),
        Description: new RegExp(query.Description, "i"),
        Active: true
    };

    return result;
};

var prepareItem = function(source) {
    var result = source;

    return result;
};

exports.TutorSubjectDetail =  (req, res, next) => { 
  res.render('tutor/TutorSubjectDetail', {  //// redirecting to product page.
   
  });
};

exports.GetSubject = async (req, res, next) => {
  Subject.find(getClientFilter(req.query)).lean()
  .exec(function(err0, items) {
    res.json(items);
  });
};

exports.PostSubject = (req, res) => {
  Subject.create(prepareItem(req.body), function(err, item) {
      res.json(item);
  });
};

exports.PutSubject = (req, res, next) => {
  var item = prepareItem(req.body.item);
  console.log(item);
  Subject.updateOne({ _id: item._id }, item, {}, function(err, item) {
        res.json(item);
    });
};

exports.DeleteSubject = (req) => {
  var item = prepareItem(req.body.item);
  Subject.remove({ _id: item._id }, {}, function(err, item) {
      res.json(item);
  });
};