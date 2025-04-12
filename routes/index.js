const router = require('express').Router();
const employeeInfoRoute = require('./employees');
const expensesRoute = require('./expenses');
const passport = require('passport');
router.use('/', require('./swagger'));

router.get('/', (req, res) => {
     //#swagger tags =['Welcome to the Info View']
    res.send('Welcome to the Info View');
});

//use this path to get all employee information
router.use('/employees', employeeInfoRoute);

//Access all expenses via
router.use('/expenses', expensesRoute);

//Auth login route
router.get('/login', passport.authenticate('github'), (res, req) => {});

//Auth logged out route
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { //Checks and return any error and next error if exists, else redirects the user
            return next(err);
        }
    })
    res.redirect('/')
});

module.exports = router;