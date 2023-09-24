const Interview = require('../models/interview_detail');
const Student = require('../models/student_detail');
const Allocate = require('../models/allocated_interview_detail');

module.exports.details = async (req, res)=>{
   try{
        if(!req.isAuthenticated()){
            res.redirect('/users/sign_up');
        }

        const inteview = await Interview.find().sort('-createdAt');

        res.render('interview_manager',{
            title: 'Placement | Inteview Manager',
            interviews : inteview
        })
   }catch(err){
    console.log(`error coming in display interview ${err}`);
   }
    
}

// creating interview
module.exports.create = async (req, res)=>{
    try{
        const interview = await Interview.create(req.body);
        if(req.xhr){ 
            return res.status(200).json(interview);
         }
    }catch(err){
        console.log(`Error creating interview: ${err}`);
        if (req.xhr) {
         return res.status(500).json({ error: 'Internal Server Error' });
        } else {
        // Handle non-AJAX request error here
        }
    }
}

// controller to allocate interview form
module.exports.allocateForm = async(req, res) => {
    try{
        if(!req.isAuthenticated()){
            res.redirect('/users/sign_up');
        }
        
        var interviewId = req.params.id;
        const interview = await Interview.findById(interviewId);
        // here we fetch all student id which is associated to particular interview
        let response = [];
        if (interview) {
            const studentsIds = interview.students;
            
            if (studentsIds.length > 0) {
              const student = await Student.find({ _id: { $in: studentsIds } });
          
              for (const studentId of studentsIds) {
                const status = await Allocate.findOne({ interview: interviewId, student: studentId });
          
                const foundStudent = student.find(s => s._id.toString() === studentId.toString());
          
                if (status && foundStudent) {
                  const interId = interviewId;
                  const sid = foundStudent._id;
                  const name = `${foundStudent.firstName} ${foundStudent.lastName}`;
                  const email = foundStudent.email;
                  const mobile = foundStudent.mobileNumber;
                  const address = foundStudent.address;
                  const statusValue = status.status;
          
                  response.push({
                    interId,
                    sid,
                    name,
                    email,
                    mobile,
                    address,
                    status: statusValue
                  });
                }
              }
            }

        if(response.length > 1)
            response = response.reverse();
           
          } else {
            console.log('Interview not found');
          }
          
        res.render('allocate_interview', {
            title: 'Placement | Interview Allocation',
            students: response,
            interId:  req.params.id
        })
    }catch(err){
        console.log(`error coming in allocating the interview ${err}`);
    }
}
// controller to allocate the interview
module.exports.allocate = async (req, res) => {
    try{
        
        const student = await Student.findOne({email: req.body.email});
        const interview = await Interview.findById(req.body.interviewId);

        if(student && interview){
            // check if student is not allot to same interview
            if (!interview.students.includes(student.id) && !student.interview.includes(interview.id)) {
                interview.students.push(student);
                student.interview.push(interview);

                interview.save(); // saving the final version of interview
                student.save(); // saving the final version of student
            }
            
    
            let allocated = await Allocate.findOne({ interview: interview.id, student: student.id });
            if(!allocated){
                allocated = await new Allocate({
                    student: student,
                    interview: interview
                }).save();
                res.redirect('back');
            }
            else{
                console.log('Already Allotated');
                res.redirect('back');
            }

        }else{
            console.log('student and interview not exists')
            res.redirect('back');
        }
    }catch(err){
        console.log(`error coming in allo cating the interview ${err}`);
    }
}

// update the interview status
module.exports.updateStatus = async (req, res) => {
    try{
        const interview = await Allocate.findOne({
            student: req.body.studentId,
            interview: req.body.interviewId
          });
        
          console.log(interview)
          interview.status = req.body.status;
          interview.save();

          res.redirect('back');

    }catch(err){
        console.log(`error coming in updating interview ${err}`);
    }
}
// controller to delete the interview
module.exports.delete = async (req, res) => {
    try{    
        const interviewId = req.params.id;
        const interview_detail = await Interview.findOne({_id : interviewId});
        const studentsIds = interview_detail.students;

        
        // remove interview id from all student which have to the students 
        const removeStudentId = await Student.updateMany(
            { interview: interviewId },
            { $pull: { interview: interviewId } }
        );

        // deleting all interview status which is belong to single interview and students which is associated with single interview
        const deletedInterviewStatus = await Allocate.deleteMany({
            interview: interviewId,
            student: { $in: studentsIds }
        });

        // at the end remove student
        await Interview.deleteOne({_id : interviewId});
        console.log('deleted interview');
        res.redirect('back');
    }catch(err){
        console.log(`error coming in deleting the interview ${err}`);
    }
}