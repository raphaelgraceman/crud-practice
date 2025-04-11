const express = require('express');
const router = require('express').Router();
const expensesController = require('../controllers/expenses');
const validate = require('../middlewares/validateExpense');

//Routes for expenses info
router.get('/', expensesController.getAllExpenses);
router.get('/:id', expensesController.getSingleExpenses);
router.post('/', validate.addExpenseData, expensesController.addExpenses);
router.put('/:id', validate.updateExpenseData, expensesController.updateExpenses);
router.delete('/:id', expensesController.deleteExpenses);




module.exports = router;
