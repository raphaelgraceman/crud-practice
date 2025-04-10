const validator = require('../helpers/validator');

const addExpenseData = (req, res, next) => {
  const validationRule = {
    expenseName: 'required|string',
    expenseCategory: 'required|string',
    amountSpent: 'required|string',
    date: 'required|date'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  addExpenseData
};
