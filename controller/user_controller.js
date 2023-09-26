const User = require('../models/user');

// profile page controller

// render the sign up page
module.exports.signUp = async (req, res)=>{
    // if the user autheticated
    if(req.isAuthenticated()){
        return res.redirect('/placement/manager');
    }

    // rendering the sign up page
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
    
    // rendering the sign in page
    return res.render('sign_in',{
        title:"Placement | Sign In"
    })
}

// user create controller mean employer
module.exports.create = async (req, res) => {
    try {
        if (req.body.password != req.body.confirm_password) {
            req.flash('error','Invalid username or password !');
            return res.redirect('back');
        }

        // check if the user exist or not
        const existingUser = await User.findOne({ email: req.body.email });
        
        // if not exist then create otherwise display message 
        if (!existingUser) {
            const newUser = await User.create(req.body);
            req.flash('success','Sign Up successfully');
            return res.redirect('/users/sign_in');
        } else {
            req.flash('error','User Exists Already !');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in sign up:', err);
        return res.redirect('back');
    }
};

// get sing in data 
// create session for user
module.exports.createSession = async (req, res)=>{
   // req.flash('success','Log in successfully');
   const user = await User.findOne({email: req.body.email});
    if(user){
        req.flash('success','Sign In Successfully');
        res.redirect('/placement/manager');
    }
    else{
        req.flash('error','Invalid username or password !');
        res.redirect('/users/sign_up');
    }
}

// sign out controller
module.exports.signOut = (req, res, next)=>{

    req.logout((err)=>{
     if(err)
         return next(err);
 
     req.flash('success','loggout successfully');
     res.redirect('/');
 
    });
 }