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
         else{
            req.flash('success','Interview Created');
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
            req.flash('error','Interview not found');
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

        if(interview){
            const dateOfInterview = interview.date;
            const currentDate = new Date();

            // this is done only for comparing date
            currentDate.setHours(0, 0, 0, 0);
            dateOfInterview.setHours(0, 0, 0, 0);

            // if interview date is less than to current date mean interview date passed student can not be applied
            if(dateOfInterview < currentDate){
                req.flash('success', 'Interview Date Passed');
                res.redirect('back');
            }
        }
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
                req.flash('success','Allocated Successfully');
                res.redirect('back');
            }
            else{
                req.flash('error','Already Allotated');
                res.redirect('back');
            }

        }else{
            req.flash('error','student and interview not exists');
            res.redirect('back');
        }
    }catch(err){
        console.log(`error coming in allo cating the interview ${err}`);
    }
}

// update the interview status
module.exports.updateStatus = async (req, res) => {
    try{
        const sId = req.body.studentId; 
        const intId = req.body.interviewId;
        const interview = await Allocate.findOne({
            student: sId,
            interview: intId
          });
        
          interview.status = req.body.status;
          interview.save();

          // this query help us to find student is palce or not if student inteview status is pass at least one
            let placeStatus = [];
            placeStatus = await Allocate.find({
            student: sId,
            status: "pass"
            }).limit(1);

            if(placeStatus.length > 0){
                const result = await Student.updateOne({ _id: sId }, { $set: { placed: true } });
            }
            else{
                const result = await Student.updateOne({ _id: sId }, { $set: { placed: false } });
            }
          req.flash('success','Updated Successfully');
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

         res.redirect('back');
    }catch(err){
        console.log(`error coming in deleting the interview ${err}`);
    }
}