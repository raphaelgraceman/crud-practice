const express = require('express');
const router = require('express').Router();
const expensesController = require('../controllers/expenses');
const validate = require('../middlewares/validateExpense');
const {isAuthenticated} = require('../middlewares/authenticate');

//Routes for expenses info
router.get('/', expensesController.getAllExpenses);
router.get('/:id', expensesController.getSingleExpenses);
router.post('/', isAuthenticated, validate.addExpenseData, expensesController.addExpenses);
router.put('/:id', isAuthenticated, validate.updateExpenseData, expensesController.updateExpenses);
router.delete('/:id', isAuthenticated, expensesController.deleteExpenses);




module.exports = router;
