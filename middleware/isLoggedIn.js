module.exports = function(req, res, next) {
    //check if there isnt a user
    if (!req.user) {
        //send scathing message
        req.flash('error', 'You must be logged in to access this page'); 
        //redirect to the login page
        res.redirect('/auth/login');
    } else {
        //carry on
        next();
    }
}