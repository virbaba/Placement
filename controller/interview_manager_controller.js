const Interview = require('../models/interview_detail');

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