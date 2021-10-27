const Subject = require('../models/Subject');

try {
    Subject.insertMany( [
        { Name: "Accounting", DisplaySeq: "5", Description: "Accounting", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                  ,
        { Name: "Algebra", DisplaySeq: "10", Description: "Algebra", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                       ,
        { Name: "Biology", DisplaySeq: "15", Description: "Biology", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                       ,
        { Name: "Literature", DisplaySeq: "20", Description: "Literature", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                 ,
        { Name: "Botany", DisplaySeq: "25", Description: "Botany", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                         ,
        { Name: "Calculus", DisplaySeq: "30", Description: "Calculus", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                     ,
        { Name: "Business", DisplaySeq: "35", Description: "Business", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                     ,
        { Name: "Chemistry", DisplaySeq: "40", Description: "Chemistry", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                   ,
        { Name: "Chinese", DisplaySeq: "45", Description: "Chinese", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                       ,
        { Name: "Civics", DisplaySeq: "50", Description: "Civics", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                         ,
        { Name: "Computer", DisplaySeq: "55", Description: "Computer", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                     ,
        { Name: "Mathematics", DisplaySeq: "60", Description: "Mathematics", subjectRateMultiplier: "2.00", SubjectCreateDate: "2021-10-15", Active: 1 }               ,
        { Name: "French", DisplaySeq: "65", Description: "French", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                         ,
        { Name: "Hindi", DisplaySeq: "70", Description: "Hindi", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                           ,
        { Name: "Tamil", DisplaySeq: "75", Description: "Tamil", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                           ,
        { Name: "Management", DisplaySeq: "80", Description: "Management", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                 ,
        { Name: "English", DisplaySeq: "85", Description: "English", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                       ,
        { Name: "Hebrew", DisplaySeq: "90", Description: "Hebrew", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                         ,
        { Name: "Geography", DisplaySeq: "95", Description: "Geography", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                   ,
        { Name: "German", DisplaySeq: "100", Description: "German", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                        ,
        { Name: "Japanese", DisplaySeq: "105", Description: "Japanese", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                    ,
        { Name: "Language Arts", DisplaySeq: "110", Description: "Language Arts", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }          ,
        { Name: "Latin", DisplaySeq: "115", Description: "Latin", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                          ,
        { Name: "History", DisplaySeq: "120", Description: "History", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                      ,
        { Name: "Philosophy", DisplaySeq: "125", Description: "Philosophy", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                ,
        { Name: "Physical Education", DisplaySeq: "130", Description: "Physical Education", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 },
        { Name: "Physics", DisplaySeq: "135", Description: "Physics", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                      ,
        { Name: "Programming", DisplaySeq: "140", Description: "Programming", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }              ,
        { Name: "Psychology", DisplaySeq: "145", Description: "Psychology", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                ,
        { Name: "SAT Prep", DisplaySeq: "150", Description: "SAT Prep", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                    ,
        { Name: "Science", DisplaySeq: "155", Description: "Science", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                      ,
        { Name: "Social Studies", DisplaySeq: "160", Description: "Social Studies", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }        ,
        { Name: "Sociology", DisplaySeq: "165", Description: "Sociology", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                  ,
        { Name: "Spanish", DisplaySeq: "170", Description: "Spanish", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                      ,
        { Name: "Statistics", DisplaySeq: "175", Description: "Statistics", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                ,
        { Name: "Zoology", DisplaySeq: "180", Description: "Zoology", subjectRateMultiplier: "1.00", SubjectCreateDate: "2021-10-15", Active: 1 }                      
    ] );

 } catch (e) {
    console.log(e);
 }
