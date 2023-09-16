const User = require('../models/user');
module.exports.placementManager = async(req, res) => {

    if(!req.isAuthenticated()){
        res.redirect('/users/sign_up');
    }

    return res.render('placement_cell', {
        title: "Placement | Placement Cell",
    });
    
}