const Education = require('../models/education_detail');
const Batch = require('../models/batch_detail');
const Score = require('../models/score_detail');
const Student = require('../models/student_detail');
const Allocation = require('../models/allocated_interview_detail');
const Interview = require('../models/interview_detail');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');


// display the student manager portal
module.exports.studentManager = async (req, res) => {
    try{
        if(!req.isAuthenticated()){
            return res.redirect('/users/sign_up');
        }
         const student = await Student.find().sort('-createdAt');
       
         return res.render('student_manager', {
            title: 'Placement | Student Manager',
            students : student
        });
    }
    catch(err){
        console.log(err);
    }
    
}

// help to add student
module.exports.addStudent = async(req, res) => {
    try{
        const email = req.body.email;
        const existsUser = await Student.findOne({email: email});
        // check user exists or not
        if(existsUser){
            req.flash('error','User Exists Already !');
            res.redirect('back');
        }
        else{
         // stroring education data
        const { collegeName, specialization, cgpa, startYear, endYear} = req.body;
        const savedEducation = await (new Education({ collegeName, specialization, cgpa, startYear, endYear})).save();

        // storing batch data
        const { batchName, startDate, endDate} = req.body;
        const savedBatch = await (new Batch({ batchName, startDate, endDate})).save();

        // storing score data
        const { dsaScore, webDevelopmentScore, reactFrontEnd} = req.body;
        const savedScore = await (new Score({ dsaScore, webDevelopmentScore, reactFrontEnd})).save();

        // finally storing Student Data
        const { firstName, lastName, email, mobileNumber, gender, address} = req.body;

        

        const savedStudent = await new Student({
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobileNumber: mobileNumber,
            gender: gender,
            address: address,
            education: savedEducation._id,
            batch: savedBatch._id,
            score: savedScore._id
          }).save();


         if(req.xhr){
            const student = {
                _id: savedStudent._id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                mobileNumber: req.body.mobileNumber,
                address : req.body.address
            };
            
            return res.status(200).json(student);
         }
         else{
            req.flash('success','Student Added');
         }
            

        }
    }catch(err){
        console.log(`error coming in add student controller ${err}`);
        res.redirect('back');
    }
    
}

// displaying the complete 

module.exports.completeDetails = async (req, res) => {
    try{
        // fetching the complete details of student and it's related interview and interview status
        const studentId = req.params.id;
        const student_detail = await Student.findOne({_id : studentId});

        const education_id = student_detail.education; // education id
        const batch_id = student_detail.batch; // batch id
        const score_id = student_detail.score; // score id
        
        const education_detail = await Education.findOne({_id : education_id}); // education_detail
        const batch_detail = await Batch.findOne({_id : batch_id}); // batch_detail
        const score_detail = await Score.findOne({_id : score_id}); // score_detail

        // Find allocation documents for the specified student
        const allocations = await Allocation.find({ student: studentId });

        // Extract interview IDs from the allocations
        const interviewIds = allocations.map(allocation => allocation.interview);

        // Find interviews using the extracted IDs
        const interviews = await Interview.find({ '_id': { $in: interviewIds } });

        // Combine interview data with status
        let interviewAndStatus = [];
        interviewAndStatus = allocations.map(allocation => {
        const interview = interviews.find(interview => interview._id.equals(allocation.interview));
        return {
            allocationStatus: allocation,
            interviewData: interview
        };
        });

        // this is for displaying interview details in LIFO order
        if(interviewAndStatus.length > 1){
            interviewAndStatus = interviewAndStatus.reverse();
        }
        
        return res.render('student_details', {
            title: 'Placement | Student Details',
            student : student_detail,
            education : education_detail,
            batch : batch_detail,
            score : score_detail,
            interviewAndStatus: interviewAndStatus
        });
    }
    catch(err){
        console.log(`error coming in display all details of student ${err}`);
    }
    
}

// deleting the student
module.exports.deleteStudent = async (req, res) => {

    try{

        const studentId = req.params.id;
        const student_detail = await Student.findOne({_id : studentId});
        const interviewIds = student_detail.interview;

        const education_id = student_detail.education;
        const batch_id = student_detail.batch;
        const score_id = student_detail.score;
        
        await Education.deleteOne({_id : education_id});
        await Batch.deleteOne({_id : batch_id});
        await Score.deleteOne({_id : score_id});
        
        // remove student id from all interview 
        const removeStudentId = await Interview.updateMany(
            { students: studentId },
            { $pull: { students: studentId } }
        );

        // deleting all interview status which is belong to single student and inteviews which is associated with single student
        const deletedInterviewStatus = await Allocation.deleteMany({
            student: studentId,
            interview: { $in: interviewIds }
        });

        // at the end remove student
        await Student.deleteOne({_id : studentId});

        
        res.redirect('back');

    }catch(err){
        console.log(`error coming in deletion of student ${err}`);
    }

}

// download CSV data

module.exports.download = async (req, res) => {
  const studentId = req.body.studentId;
   
  try {
    const student = await Student.findOne({ _id: studentId });
    const path = `E://Placement//downloads//${student.email}.csv`
    generateCSV(student, path)
    req.flash('success','downloaded');
    res.redirect('back');
  }
  catch(err){
    console.log(`error in single student download csv file ${err}`)
  }
};


module.exports.downloadAll = async (req, res) => {
    try{
        const students = await Student.find({}); // Fetch all students

        for (const student of students) {
            const path = `E://Placement//downloadAll//${student.email}.csv`
            await generateCSV(student, path);
        } 
        req.flash('success', 'Downloaded');
        res.redirect('back')

    }
    catch(err){
        console.error('Error:', err);
        req.flash('error', 'Error generating CSV');
        res.redirect('back');
    }
    
};

// this function generate CSV file
async function generateCSV(student, filePath){
    try {
        if (!student) {
          req.flash('error', 'Student Not Found');
          return res.redirect('back');
        }
    
        const education = await Education.findOne({ _id: student.education });
        const batch = await Batch.findOne({ _id: student.batch });
        const score = await Score.findOne({ _id: student.score });
    
        const records = [];
        if(student.interview.length > 0){
            for (const interviewId of student.interview) {
                const interview = await Interview.findOne({ _id: interviewId });
          
                if (interview) {
                  const allocate = await Allocation.find({
                    student: student._id,
                    interview: interviewId,
                  });
          
                  if (allocate.length > 0) {
                    const record = {
                      SId: student.email,
                      Name: `${student.firstName} ${student.lastName}`,
                      College: education.collegeName, 
                      Placed: student.placed ? 'Yes' : 'No',
                      DSAFinalScore: score.dsaScore,
                      webDFinalScore: score.webDevelopmentScore,
                      ReactFinalScore: score.reactFrontEnd,
                      InterviewCompany: interview.companyName,
                      InterviewDate: interview.date,
                      Role: interview.role,
                      InterviewResult: allocate[0].status, // Assuming status is in Allocate
                    };
          
                    records.push(record);
                  } 
              }
            }
        }
        else {
            const record = {
                SId: student.email,
                Name: `${student.firstName} ${student.lastName}`,
                College: education.collegeName, 
                Placed: student.placed ? 'Yes' : 'No',
    
                DSAFinalScore: score.dsaScore,
                webDFinalScore: score.webDevelopmentScore,
                ReactFinalScore: score.reactFrontEnd,
    
                InterviewCompany: "N/A",
                InterviewDate: "N/A",
                Role: "N/A",
                InterviewResult: "N/A", // Assuming status is in Allocate
              };
    
              records.push(record);
      }
        
     

        const csvWriter = createCsvWriter({
          path: filePath, 
          header: [
            { id: 'SId', title: 'Student ID' },
            { id: 'Name', title: 'Student Name' },
            { id: 'College', title: 'Student College' }, 
            { id: 'Placed', title: 'Placed' },
            { id: 'DSAFinalScore', title: 'DSA Final Score' },
            { id: 'webDFinalScore', title: 'WebD Final Score' },
            { id: 'ReactFinalScore', title: 'React Final Score' },
            { id: 'InterviewCompany', title: 'Company' },
            { id: 'InterviewDate', title: 'Interview Date' },
            { id: 'Role', title: 'Role' },
            { id: 'InterviewResult', title: 'Interview Result' },
          ],
        });
    
        await csvWriter.writeRecords(records);
        
      } catch (error) {
        console.error('Error:', error);
      }
}
  