const express = require('express');
const router = require('express').Router();
const employeeController = require('../controllers/employeeInfo');
const validate = require('../middlewares/validateEmployee')
//Routes for Employees info

router.get('/', employeeController.getAllEmployeeInfo);

router.get('/:id', employeeController.getSingleEmployeeInfo);

router.post('/', validate.addEmployeeInfo, employeeController.addEmployeeInfo);

router.put('/:id', validate.addEmployeeInfo, employeeController.updateEmployeeInfo);

router.delete('/:id', employeeController.deleteEmployeeInfo);


module.exports = router;
