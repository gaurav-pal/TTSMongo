const Subject = require('../models/Subject');

try {
    Subject.insertMany( [
        {Name: 'Accounting',  DisplaySeq: 5,  Description: 'Accounting',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Algebra',  DisplaySeq: 10,  Description: 'Algebra',  SubjectRateMultiplier: 45,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Biology',  DisplaySeq: 15,  Description: 'Biology',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Literature',  DisplaySeq: 20,  Description: 'Literature',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Botany',  DisplaySeq: 25,  Description: 'Botany',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Calculus',  DisplaySeq: 30,  Description: 'Calculus',  SubjectRateMultiplier: 45,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Business',  DisplaySeq: 35,  Description: 'Business',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Chemistry',  DisplaySeq: 40,  Description: 'Chemistry',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Chinese',  DisplaySeq: 45,  Description: 'Chinese',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Civics',  DisplaySeq: 50,  Description: 'Civics',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Computer',  DisplaySeq: 55,  Description: 'Computer',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Mathematics',  DisplaySeq: 60,  Description: 'Mathematics',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'French',  DisplaySeq: 65,  Description: 'French',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Hindi',  DisplaySeq: 70,  Description: 'Hindi',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Tamil',  DisplaySeq: 75,  Description: 'Tamil',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Management',  DisplaySeq: 80,  Description: 'Management',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},  
        {Name: 'English',  DisplaySeq: 85,  Description: 'English',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Hebrew',  DisplaySeq: 90,  Description: 'Hebrew',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Geography',  DisplaySeq: 95,  Description: 'Geography',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'German',  DisplaySeq: 100,  Description: 'German',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Japanese',  DisplaySeq: 105,  Description: 'Japanese',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Language Arts',  DisplaySeq: 110,  Description: 'Language Arts',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Latin',  DisplaySeq: 115,  Description: 'Latin',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'History',  DisplaySeq: 120,  Description: 'History',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Philosophy',  DisplaySeq: 125,  Description: 'Philosophy',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Physical Education',  DisplaySeq: 130,  Description: 'Physical Education',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Physics',  DisplaySeq: 135,  Description: 'Physics',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Programming',  DisplaySeq: 140,  Description: 'Programming',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Psychology',  DisplaySeq: 145,  Description: 'Psychology',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'SAT Prep',  DisplaySeq: 150,  Description: 'SAT Prep',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Science',  DisplaySeq: 155,  Description: 'Science',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Social Studies',  DisplaySeq: 160,  Description: 'Social Studies',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Sociology',  DisplaySeq: 165,  Description: 'Sociology',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Spanish',  DisplaySeq: 170,  Description: 'Spanish',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Statistics',  DisplaySeq: 175,  Description: 'Statistics',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true},
        {Name: 'Zoology',  DisplaySeq: 180,  Description: 'Zoology',  SubjectRateMultiplier: 30,  SubjectCreateDate: "2021-10-15",  Active: true}       
    ] );

 } catch (e) {
    console.log(e);
 }
