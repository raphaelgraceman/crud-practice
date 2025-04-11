const validator = require('../helpers/validator');

const addEmployeeInfo = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    birthDay: 'required|date',
    email: 'required|email',
    department: 'required|string',
    appointmentDate: 'required|date',
    salary: 'required|string',
    qualification: 'string',
    function: 'string'
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
  addEmployeeInfo
};
