// render the sign up page
module.exports.signUp = (req, res)=>{
    // if the user autheticated
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('sign_up',{
        title:"Placement | Sign Up"
    })
}