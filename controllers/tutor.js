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

exports.StudentProfile = (req, res, next) => {
  res.render('tutor/StudentProfile', {
      title: 'Student\'s Profile',

  });
};

exports.TeacherProfile = (req, res, next) => {
  res.render('tutor/TeacherProfile', {
      title: 'Teacher\'s Profile',
      
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





var getClientFilter = function(query) {
    var result = {
        Name: new RegExp(query.Name, "i"),
        Description: new RegExp(query.Description, "i")
    };

    return result;
};

var prepareItem = function(source) {
    var result = source;
    result.Married = source.Married === 'true' ? true : false;
    result.Country = parseInt(source.Country, 10);
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
  Categorie.create(prepareItem(req.body), function(err, item) {
      res.json(item);
  });
};

exports.PutSubject = (req, res, next) => {
  var item = prepareItem(req.body);
    Categorie.update({ _id: item._id }, item, {}, function(err, item) {
        res.json(item);
    });
};

exports.DeleteSubject = (req) => {
  var item = prepareItem(req.body);
  Categorie.remove({ _id: item._id }, {}, function(err, item) {
      res.json(item);
  });
};