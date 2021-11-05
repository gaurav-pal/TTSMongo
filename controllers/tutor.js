const { promisify } = require('util');
const crypto = require('crypto');
//const nodemailer = require('nodemailer');
//const nodemailerSendgrid = require('nodemailer-sendgrid');
//const passport = require('passport');
//const _ = require('lodash');
const validator = require('validator');
//const mailChecker = require('mailchecker');
const Subject = require('../models/Subject');
const GradeLevel = require('../models/GradeLevel');
const Profile = require('../models/Profile');
const { Console } = require('console');

const randomBytesAsync = promisify(crypto.randomBytes);

exports.getSearch = (req, res) => {
  Subject.find({ "Active": true }, function(err0, allSubjects) {
      if (err0) {
          console.log(err0);
      } else {
        GradeLevel.find({ "Active": true }, function(err1, allGradeLevels) {
            if (err1) {
                console.log(err1);
            } else {
                res.render('tutor/search', {
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

  res.render('tutor/TeacherListForSearch', {  //// redirecting to product page.
    title: 'Teacher List For Search'
  });
};

exports.StudentProfile = (req, res, next) => {
  var profile = Profile.findOne({ "UserID": req.user.id });
  
  res.render('tutor/StudentProfile', {
      title: 'Student\'s Profile',
      profile: profile
  });
};

exports.TeacherProfile = (req, res, next) => {
  //console.log(req.user.id);
  var profile = Profile.findOne({ UserID: req.user.id }, (error, result) => {
    if(error) {
      console.log(profile);
      res.render('tutor/TeacherProfile', {
        title: 'Teacher\'s Profile'
      });   
    }
    res.render('tutor/TeacherProfile', {
      title: 'Teacher\'s Profile',
      profile: result
    }); 
  });
  
};

exports.PostTeacherProfile = (req, res, next) => { /// TODO: Post teacher profile and comeback to teacher profile
  console.log(req.body);
  console.log(req.user.id);
  var query = {
      UserID: req.user.id
  },
  update = { 
    UserID: req.user.id,
    About: req.body.About,
    Flags: "",
    Address: req.body.Address,
    City: req.body.City,
    State: req.body.State,
    ZipCode: req.body.ZipCode
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

var getProfileFilter = function(query) {
  var result = {
      user: new RegExp(query.Name, "i"),
      Description: new RegExp(query.Description, "i"),
      Active: true
  };
  return result;
};

var prepareProfile = function(source) {
  var result = source;
  if(source.UserID){} ///TODO: if no date then todays date else leave it. for date

  return result;
};

exports.GetProfile = async (req, res, next) => {
  Profile.find(getProfileFilter(req.query)).lean().exec(function(err0, items) {
    res.json(items);
  });
};

exports.PostProfile = (req, res) => {
  Profile.create(prepareProfile(req.body), function(err, item) {
      res.json(item);
  });
};

exports.PutProfile = (req, res, next) => {
  var item = prepareProfile(req.body.item);
  Profile.updateOne({ _id: item._id }, item, {}, function(err, item) {
      res.json(item);
  });
};

exports.DeleteProfile = (req) => {
  var item = prepareProfile(req.body.item);
  Profile.remove({ _id: item._id }, {}, function(err, item) {
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