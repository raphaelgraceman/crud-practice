//importing database
const mongodb = require('../database/connect');
//create an object of mongodb ID for the database
const ObjectId = require('mongodb').ObjectId;

//getAll Expenses
const getAllExpenses = async(req, res) => {
   //#swagger tags =['Welcome to the Info View']
    const result = await mongodb.getDatabase().db().collection('expenses').find();
    result.toArray().then((expenses) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(expenses)
    });
};

//get single expense Data
const getSingleExpenses = async(req, res) => {
   //#swagger tags =['Welcome to the Info View']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid expense id');
    }

    const expenseId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('expenses').find({_id: expenseId});
    result.toArray().then((expenses) => {
        res.setHeader("Content-Type", 'application/json');
        res.status(200).json(expenses[0]);
    }); 
};

//Create Employee
const addExpenses = async (req, res) => {
     //#swagger tags =['Welcome to the Info View']
    const expense = {
      expenseName: req.body.expenseName,
      expenseCategory: req.body.expenseCategory,
      amountSpent: req.body.amountSpent,
      date: req.body.date,
    };
    const response = await mongodb.getDatabase().db().collection('expenses').insertOne(expense);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while adding Expenses Info.');
    }
};

//Update Employee Info
const updateExpenses = async (req, res) => {
    //#swagger tags =['Welcome to the Info View']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid expense id to update Expenses Info');
    }
    const expenseId = new ObjectId(req.params.id);
    const expense = {
      expenseName: req.body.expenseName,
      expenseCategory: req.body.expenseCategory,
      amountSpent: req.body.amountSpent,
      date: req.body.date,
    };
    const response = await mongodb
      .getDatabase().db().collection('expenses').replaceOne({ _id: expenseId }, expense);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the Expenses Info');
    }
};

//Delete Expenses Data
const deleteExpenses = async (req, res) => {
   //#swagger tags =['Welcome to the Info View']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid expense id to delete an Expense Info.');
  }
  const expenseId = new ObjectId(req.params.id);

  const response = await mongodb.getDatabase().db().collection('expenses').deleteOne({ _id: expenseId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the Expenditure Info.');
  }
};


module.exports = {getAllExpenses, getSingleExpenses, addExpenses, updateExpenses, deleteExpenses};