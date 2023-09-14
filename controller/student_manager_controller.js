const Course = require('../models/course');

module.exports.studentManager = async (req, res) => {
    try{
        if(!req.isAuthenticated()){
            return res.redirect('/users/sign_up');
        }
        const course = await Course.find({});
        return res.render('student_manager', {
            title: 'Placement | Student Manager',
            courseList : course
        })
    }
    catch(err){
        console.log(err);
    }
    
}