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

exports.postSearch = (req, res, next) => {
    const validationErrors = [];
    if (validator.isEmpty(req.body.Subject)) validationErrors.push({ msg: 'Please select a subject.' });
    if (validator.isEmpty(req.body.GradeLevel)) validationErrors.push({ msg: 'Please select a grade level.' });
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors);
      return res.redirect('tutor/search');
    }
    // req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });
  
    // passport.authenticate('local', (err, user, info) => {
    //   if (err) { return next(err); }
    //   if (!user) {
    //     req.flash('errors', info);
    //     return res.redirect('/login');
    //   }
    //   req.logIn(user, (err) => {
    //     if (err) { return next(err); }
    //     req.flash('success', { msg: 'Success! You are logged in.' });
    //     res.redirect(req.session.returnTo || '/');
    //   });
    // })(req, res, next);
  };
  