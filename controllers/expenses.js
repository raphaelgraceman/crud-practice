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

  try {
    const expenseId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('expenses').find({_id: expenseId});
    result.toArray().then((expenses) => {
        res.setHeader("Content-Type", 'application/json');
        res.status(200).json(expenses[0]);
    }); 
  } catch (error) {
    console.error('Error retrieving expense data:', error);
    res.status(500).json('An error occurred while retrieving expense data');
  }
};

//Create Expense
const addExpenses = async (req, res) => {
     //#swagger tags =['Welcome to the Info View']
    const expense = {
      expenseName: req.body.expenseName,
      expenseCategory: req.body.expenseCategory,
      amountSpent: req.body.amountSpent,
      date: req.body.date,
      month: req.body.month,
      day: req.body.day,
      paymentType: req.body.paymentType
    };
  try {
    const response = await mongodb.getDatabase().db().collection('expenses').insertOne(expense);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Error occurred adding Expenses Info.');
    }
  }catch (error){
    console.error('Error adding expenses data', error);
    res.status(500).json('An error occurred while adding expense data')
  }
};

//Update Expense Info
const updateExpenses = async (req, res) => {
  //#swagger tags =['Welcome to the Info View']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid expense id to update Expenses data');
  }
  const expenseId = new ObjectId(req.params.id);
  const expense = {
    expenseName: req.body.expenseName,
    expenseCategory: req.body.expenseCategory,
    amountSpent: req.body.amountSpent,
    date: req.body.date,
    month: req.body.month,
    day: req.body.day,
    paymentType: req.body.paymentType
  };
  try{
    const response = await mongodb
    .getDatabase().db().collection('expenses').replaceOne({ _id: expenseId }, expense);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while updating the Expenses data');
  }
} catch (error) {
  console.error('Error updating expense data:', error);
  res.status(500).json('An error occurred while updating expense data');
}
};

//Delete Expenses Data
const deleteExpenses = async (req, res) => {
   //#swagger tags =['Welcome to the Info View']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid expense id to delete an Expense Info.');
  }
 try{
  const expenseId = new ObjectId(req.params.id);

  const response = await mongodb.getDatabase().db().collection('expenses').deleteOne({ _id: expenseId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(201).send('Deleted successfully');
  } else {
    res.status(500).json(response.error || 'Error occurred while deleting the Expenditure Info.');
  }
} catch (error) {
  console.error('Error deleting expense data:', error);
  res.status(500).json('An error occurred while deleting expense data');
}
};

module.exports = {getAllExpenses, getSingleExpenses, addExpenses, updateExpenses, deleteExpenses};