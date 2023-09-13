module.exports.home = (req, res)=>{
    if(!req.isAuthenticated()){
        return res.redirect('/users/sign_up');
    }
    return res.render('home', {
        title: "Home",
    });
}
