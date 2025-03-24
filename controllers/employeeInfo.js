//importing database
const mongodb = require('../database/connect');
//create an object of mongodb ID for the database
const ObjectId = require('mongodb').ObjectId;

//getAll Employee info
const getAllEmployeeInfo = async(req, res) => {
   //#swagger tags =['Welcome to the Info View']
    const result = await mongodb.getDatabase().db().collection('employees').find();
    result.toArray().then((employees) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(employees)
    });
};

//get single employee info
const getSingleEmployeeInfo = async(req, res) => {
   //#swagger tags =['Welcome to the Info View']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid employee id');
    }

    const employeeId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('employees').find({_id: employeeId});
    result.toArray().then((employees) => {
        res.setHeader("Content-Type", 'application/json');
        res.status(200).json(employees[0]);
    }); 
};

//Create Employee
const addEmployeeInfo = async (req, res) => {
     //#swagger tags =['Welcome to the Info View']
    const employee = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birthday,
      email: req.body.email,
      department: req.body.department,
      appointedDate: req.body.appointedDate,
      salary: req.body.salary
    };
    const response = await mongodb.getDatabase().db().collection('employees').insertOne(employee);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while adding Employee Info.');
    }
};

//Update Employee Info
const updateEmployeeInfo = async (req, res) => {
    //#swagger tags =['Welcome to the Info View']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid employee id to update Employee Info');
    }
    const employeeId = new ObjectId(req.params.id);
    const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        email: req.body.email,
        department: req.body.department,
        appointedDate: req.body.appointedDate,
        salary: req.body.salary
      };
    const response = await mongodb
      .getDatabase().db().collection('employees').replaceOne({ _id: employeeId }, employee);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the EmployeeInfo');
    }
};

//Delete EmployeeInfo
const deleteEmployeeInfo = async (req, res) => {
   //#swagger tags =['Welcome to the Info View']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid employee id to delete a Employee Info.');
  }
  const employeeId = new ObjectId(req.params.id);

  const response = await mongodb.getDatabase().db().collection('employees').deleteOne({ _id: employeeId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the EmployeeInfo.');
  }
};


module.exports = {getAllEmployeeInfo, getSingleEmployeeInfo, addEmployeeInfo, updateEmployeeInfo, deleteEmployeeInfo};