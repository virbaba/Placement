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
let interviewId = "";
module.exports.allocateForm = async(req, res) => {
    try{
        if(!req.isAuthenticated()){
            res.redirect('/users/sign_up');
        }
        
        interviewId = req.params.id;
        const interview = await Interview.findById(interviewId);
        // here we fetch all student id which is associated to particular interview
        const studentsIds = interview.students;
        // here we linked student data and interview status togetherly
        let response;
        if(studentsIds.length > 0){
            // according to id fetching student
            const student = await Student.find({ _id: { $in: studentsIds } });
            // according to id fetching student interview status
            const status = await Allocate.find({ student: { $in: studentsIds } });
            
            // here we link student to his/her interview status
            const studentStatusMap = new Map();

            status.forEach(alloc => {
                console.log(alloc);
            studentStatusMap.set(alloc.student.toString(), alloc.status);
            });

            response = student.map(student => {
            const Name = `${student.firstName} ${student.lastName}`;
            const Email = student.email;
            const Mobile = student.mobileNumber;
            const Address = student.address;
            const Status = studentStatusMap.get(student._id.toString()) || 'No status found';

            return {
                Name,
                Email,
                Mobile,
                Address,
                Status
            };
            });

        }
          
        res.render('allocate_interview', {
            title: 'Placement | Interview Allocation',
            students: response
        })
    }catch(err){
        console.log(`error coming in allocating the interview ${err}`);
    }
}
// controller to allocate the interview
module.exports.allocate = async (req, res) => {
    try{
        
        const student = await Student.findOne({email: req.body.email});
        const interview = await Interview.findById(interviewId);

        if(student && interview){
            interview.students.push(student);
            interview.save(); // saving the final version of interview
    
            student.interview.push(interview)
            student.save(); // saving the final version of student

            const allocated = await new Allocate({
                student: student,
                interview: interview
            }).save();

            res.redirect('back');
        }else{
            res.redirect('back');
        }
    }catch(err){
        console.log(`error coming in allocating the interview ${err}`);
    }
}

// controller to delete the interview
module.exports.delete = async (req, res) => {
    try{    
        res.redirect('back');
    }catch(err){
        console.log(`error coming in deleting the interview ${err}`);
    }
}