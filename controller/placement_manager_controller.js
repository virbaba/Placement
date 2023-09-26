const User = require('../models/user');
// display the page after successfully log in and provide two section 
// 1. student manager
// 2. interview manager
module.exports.placementManager = async(req, res) => {

    if(!req.isAuthenticated()){
        res.redirect('/users/sign_up');
    }

    return res.render('placement_cell', {
        title: "Placement | Placement Cell",
    });
    
}