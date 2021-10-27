const Gradelevel = require('../models/Gradelevel');

try {
    Gradelevel.insertMany( [

        { Name: "Adults", IntegerValue: "20", DisplaySeq: "0", Description: "Adults Subject Based", LevelCreateDate: "2021-10-15", GradeRateMultiplier: "4.00", Active: 1 }           ,
        { Name: "Kindergarten", IntegerValue: "0", DisplaySeq: "5", Description: "Grade Kindergarten", LevelCreateDate: "2021-10-15", GradeRateMultiplier: "1.00", Active: 1 }        ,
        { Name: "01", IntegerValue: "1", DisplaySeq: "10", Description: "Grade 01", LevelCreateDate: "2021-10-15", GradeRateMultiplier: "1.00", Active: 1 }                           ,
        { Name: "02", IntegerValue: "2", DisplaySeq: "15", Description: "Grade 02", LevelCreateDate: "2021-10-15", GradeRateMultiplier: "1.00", Active: 1 }                           ,
        { Name: "03", IntegerValue: "3", DisplaySeq: "20", Description: "Grade 03", LevelCreateDate: "2021-10-15", GradeRateMultiplier: "1.00", Active: 1 }                           ,
        { Name: "04", IntegerValue: "4", DisplaySeq: "25", Description: "Grade 04", LevelCreateDate: "2021-10-15", GradeRateMultiplier: "1.25", Active: 1 }                           ,
        { Name: "05", IntegerValue: "5", DisplaySeq: "30", Description: "Grade 05", LevelCreateDate: "2021-10-15", GradeRateMultiplier: "1.25", Active: 1 }                           ,
        { Name: "06", IntegerValue: "6", DisplaySeq: "35", Description: "Grade 06", LevelCreateDate: "2021-10-15", GradeRateMultiplier: "1.25", Active: 1 }                           ,
        { Name: "07", IntegerValue: "7", DisplaySeq: "40", Description: "Grade 07", LevelCreateDate: "2021-10-15", GradeRateMultiplier: "1.50", Active: 1 }                           ,
        { Name: "08", IntegerValue: "8", DisplaySeq: "45", Description: "Grade 08", LevelCreateDate: "2021-10-15", GradeRateMultiplier: "1.50", Active: 1 }                           ,
        { Name: "09", IntegerValue: "9", DisplaySeq: "50", Description: "Freshmen (Grade 09)", LevelCreateDate: "2021-10-15", GradeRateMultiplier: "1.75", Active: 1 }                ,
        { Name: "10", IntegerValue: "10", DisplaySeq: "55", Description: "Sophomores (Grade 10)", LevelCreateDate: "2021-10-15", GradeRateMultiplier: "1.75", Active: 1 }             ,
        { Name: "11", IntegerValue: "11", DisplaySeq: "60", Description: "Juniors (Grade 11)", LevelCreateDate: "2021-10-15", GradeRateMultiplier: "2.00", Active: 1 }                ,
        { Name: "12", IntegerValue: "12", DisplaySeq: "65", Description: "Seniors (Grade 12)", LevelCreateDate: "2021-10-15", GradeRateMultiplier: "2.00", Active: 1 }                ,
        { Name: "Bachelors 1st Year", IntegerValue: "13", DisplaySeq: "70", Description: "College Freshmen", LevelCreateDate: "2021-10-15", GradeRateMultiplier: "2.50", Active: 1 }  ,
        { Name: "Bachelors 2nd Year", IntegerValue: "14", DisplaySeq: "75", Description: "College Sophomores", LevelCreateDate: "2021-10-15", GradeRateMultiplier: "2.50", Active: 1 },
        { Name: "Bachelors 3rd Year", IntegerValue: "15", DisplaySeq: "80", Description: "College Juniors", LevelCreateDate: "2021-10-15", GradeRateMultiplier: "3.00", Active: 1 }   ,
        { Name: "Bachelors 4th Year", IntegerValue: "16", DisplaySeq: "85", Description: "College Seniors", LevelCreateDate: "2021-10-15", GradeRateMultiplier: "3.00", Active: 1 }   ,
        { Name: "Masters 1st Year", IntegerValue: "17", DisplaySeq: "90", Description: "Masters 1st Year", LevelCreateDate: "2021-10-15", GradeRateMultiplier: "4.00", Active: 1 }    ,
        { Name: "Masters 2nd Year", IntegerValue: "18", DisplaySeq: "95", Description: "Masters 2nd Year", LevelCreateDate: "2021-10-15", GradeRateMultiplier: "4.00", Active: 1 }  
    ]);
}
catch (e) {
    console.log(e);
 }
