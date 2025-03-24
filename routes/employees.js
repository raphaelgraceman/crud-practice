const express = require('express');
const router = require('express').Router();
const employeeController = require('../controllers/employeeInfo');
//Routes for Employees info

router.get('/', employeeController.getAllEmployeeInfo);
router.get('/:id', employeeController.getSingleEmployeeInfo);
router.post('/', employeeController.addEmployeeInfo);
router.put('/:id', employeeController.updateEmployeeInfo);
router.delete('/:id', employeeController.deleteEmployeeInfo);


module.exports = router;
