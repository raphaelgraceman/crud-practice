const express = require('express');
const router = require('express').Router();
const employeeController = require('../controllers/employeeInfo');
const validate = require('../middlewares/validateEmployee');
const {isAuthenticated} = require('../middlewares/authenticate');

//Routes for Employees info
router.get('/', employeeController.getAllEmployeeInfo);

router.get('/:id', employeeController.getSingleEmployeeInfo);

router.post('/', isAuthenticated, validate.addEmployeeInfo, employeeController.addEmployeeInfo);

router.put('/:id', isAuthenticated, validate.updateEmployeeInfo, employeeController.updateEmployeeInfo);

router.delete('/:id', isAuthenticated, employeeController.deleteEmployeeInfo);


module.exports = router;
