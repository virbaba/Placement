const Education = require('../models/education_detail');
const Batch = require('../models/batch_detail');
const Score = require('../models/score_detail');
const Student = require('../models/student_detail');

module.exports.studentManager = async (req, res) => {
    try{
        if(!req.isAuthenticated()){
            return res.redirect('/users/sign_up');
        }
        // const student = await Student.find({});

         return res.render('student_manager', {
            title: 'Placement | Student Manager',
            // students : student
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
    }catch(err){
        console.log(`error coming in add student controller ${err}`);
        res.redirect('back');
    }
    
}