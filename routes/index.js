const router = require('express').Router();

const employeeInfoRoute = require('./employees');
const expensesRoute = require('./expenses');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
     //#swagger tags =['Welcome to the Info View']
    res.send('Welcome to the Info View');
});

//use this path to get all employee information
router.use('/employees', employeeInfoRoute);

//Access all expenses via
router.use('/expenses', expensesRoute);

module.exports = router;