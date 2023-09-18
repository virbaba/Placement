const Education = require('../models/education_detail');
const Batch = require('../models/batch_detail');
const Score = require('../models/score_detail');
const Student = require('../models/student_detail');

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


module.exports.addStudent = async(req, res) => {
    try{
        const email = req.body.email;
        const existsUser = await Student.findOne({email: email});
        // check user exists or not
        if(existsUser){
            console.log('User Already Exists');
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

        // console.log(savedStudent);

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
            

        }
    }catch(err){
        console.log(`error coming in add student controller ${err}`);
        res.redirect('back');
    }
    
}

// displaying the complete 

module.exports.completeDetials = async (req, res) => {
    const studentId = req.params.id;
    const student_detail = await Student.findOne({_id : studentId});


    const education_id = student_detail.education;
    const batch_id = student_detail.batch;
    const score_id = student_detail.score;
    
    
    const education_detail = await Education.findOne({_id : education_id});
    const batch_detail = await Batch.findOne({_id : batch_id});
    const score_detail = await Score.findOne({_id : score_id});


    return res.render('student_details', {
        title: 'Placement | Student Details',
        student : student_detail,
        education : education_detail,
        batch : batch_detail,
        score : score_detail
    })
}

// deleting the student
module.exports.deleteStudent = async (req, res) => {

    try{

    const studentId = req.params.id;
    const student_detail = await Student.findOne({_id : studentId});


    const education_id = student_detail.education;
    const batch_id = student_detail.batch;
    const score_id = student_detail.score;
    
    await Student.deleteOne({_id : studentId});
    await Education.deleteOne({_id : education_id});
    await Batch.deleteOne({_id : batch_id});
    await Score.deleteOne({_id : score_id});

    res.redirect('back');

    }catch(err){
        console.log(err);
    }

}