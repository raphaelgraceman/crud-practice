const validator = require('../helpers/validator');

const addExpenseData = (req, res, next) => {
  const validationRule = {
    expenseName: 'required|string',
    expenseCategory: 'required|string',
    amountSpent: 'required|string',
    date: 'required|date',
    month: 'string',
    day: 'string',
    paymentType: 'required|string'
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


const updateExpenseData = (req, res, next) => {
  const validationRule = {
    expenseName: 'string',
    expenseCategory: 'string',
    amountSpent: 'string',
    date: 'date',
    month: 'string',
    day: 'string',
    paymentType: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Your request failed upon validation',
        data: err
      });
    } else {
      next();
    }
  });
};
module.exports = {
  addExpenseData, updateExpenseData
};
