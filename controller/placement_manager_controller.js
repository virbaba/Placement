module.exports.placementManager = (req, res) => {
    if(!req.isAuthenticated()){
        return res.redirect('/users/sign_up');
    }
    return res.render('placement_cell', {
        title: "Placement | Placement Cell",
    });
}