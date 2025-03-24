const express = require('express');
const router = require('express').Router();
const expensesController = require('../controllers/expenses');

//Routes for expenses info
router.get('/', expensesController.getAllExpenses);
router.get('/:id', expensesController.getSingleExpenses);
router.post('/', expensesController.addExpenses);
router.put('/:id', expensesController.updateExpenses);
router.delete('/:id', expensesController.deleteExpenses);




module.exports = router;
