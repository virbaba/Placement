const User = require('../models/user');

// profile page controller

// render the sign up page
module.exports.signUp = async (req, res)=>{
    // if the user autheticated
    if(req.isAuthenticated()){
        return res.redirect('/placement/manager');
    }

    return res.render('sign_up',{
        title:"Placement | Sign Up"
    })
}

// Render the sing in page
module.exports.signIn = (req, res)=>{
    // if the user autheticated
    if(req.isAuthenticated()){
        return res.redirect('/placement/manager');
    }
    return res.render('sign_in',{
        title:"Placement | Sign In"
    })
}

// sign up controller
module.exports.create = async (req, res) => {
    try {
        if (req.body.password != req.body.confirm_password) {
            console.log("Password does not match!");
            return res.redirect('back');
        }

        const existingUser = await User.findOne({ email: req.body.email });
        
        if (!existingUser) {
            const newUser = await User.create(req.body);
            console.log('User created successfully');
            return res.redirect('/users/sign_in');
        } else {
            console.log('User already exists');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in sign up:', err);
        return res.redirect('back');
    }
};

// get sing in data 
// create session for user
module.exports.createSession = (req, res)=>{
   // req.flash('success','Log in successfully');
    return res.redirect('/placement/manager');
}

// sign out controller
module.exports.signOut = (req, res, next)=>{

    req.logout((err)=>{
     if(err)
         return next(err);
 
     //req.flash('success','loggout successfully');
     res.redirect('/');
 
    });
 }