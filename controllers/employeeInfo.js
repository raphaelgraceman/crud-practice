//importing database
const mongodb = require('../database/connect');
//create an object of mongodb ID for the database
const ObjectId = require('mongodb').ObjectId

// Get All Employee Info
const getAllEmployeeInfo = async (req, res) => {
  //#swagger tags =['Welcome to the Info View']
  try {
    const result = await mongodb.getDatabase().db().collection('employees').find();
    
    result.toArray().then((employees) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(employees);
    }).catch((error) => {
        console.error('Error converting result to array:', error);
        res.status(500).json('An error occurred while retrieving employee info');
    });
  } catch (error) {
    console.error('Error retrieving employee info:', error);
    res.status(500).json('An error occurred while retrieving employee info');
  }
};

// Get Single Employee Info
const getSingleEmployeeInfo = async (req, res) => {
  //#swagger tags =['Welcome to the Info View']
 
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid employee id');
  }
  try {
    const employeeId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('employees').find({ _id: employeeId });

  result.toArray().then((employees) => {
    if (employees.length > 0) {
      res.setHeader("Content-Type", 'application/json');
      res.status(200).json(employees[0]);
    } else {
      res.status(404).json('No employee found with the given id');
    }
  });
  } catch (error) {
    console.error('Error retrieving employee info:', error);
    res.status(500).json('An error occurred while retrieving employee info');
  }
};

// Create Employee Info
const addEmployeeInfo = async (req, res) => {
  //#swagger tags =['Welcome to the Info View']
  
  const employee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDay: req.body.birthDay,
    email: req.body.email,
    department: req.body.department,
    appointmentDate: req.body.appointmentDate,
    salary: req.body.salary,
    qualification: req.body.qualification,
    function: req.body.function
  };
  try {
    const response = await mongodb.getDatabase().db().collection('employees').insertOne(employee);
    
    if (response.acknowledged) {
      res.status(201).json('Employee added successfully');
    } else {
      res.status(500).json(response.error || 'Some error occurred while adding Employee Info.');
    }
  } catch (error) {
    console.error('Error adding employee info:', error);
    res.status(500).json('An error occurred while adding employee info');
  }
};

// Update Employee Info
const updateEmployeeInfo = async (req, res) => {
  //#swagger tags =['Welcome to the Info View']

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid employee id to update Employee Info');
  }

  const employeeId = new ObjectId(req.params.id);
  const employee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDay: req.body.birthDay,
    email: req.body.email,
    department: req.body.department,
    appointmentDate: req.body.appointmentDate,
    salary: req.body.salary,
    qualification: req.body.qualification,
    function: req.body.function
  };
  try {
    const response = await mongodb
      .getDatabase()
      .db().collection('employees')
      .replaceOne({ _id: employeeId }, employee);
    
    console.log(response);
    
    if (response.modifiedCount > 0) {
      res.status(201).send('Employee Info updated successfully');
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the Employee Info');
    }
  } catch (error) {
    console.error('Error updating employee info:', error);
    res.status(500).json('An error occurred while updating employee info');
  }
};

// Delete Employee Info
const deleteEmployeeInfo = async (req, res) => {
  //#swagger tags =['Welcome to the Info View']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid employee id to delete an Employee Info.');
    }

    const employeeId = new ObjectId(req.params.id);

    const response = await mongodb.getDatabase().db().collection('employees').deleteOne({ _id: employeeId });
    console.log(response);

    if (response.deletedCount > 0) {
      res.status(201).send("Employee Info successfully deleted");
    } else {
        res.status(404).json(response.error || 'Use a valid id, no employee found.');
    }
  } catch (error) {
    console.error('Error deleting employee info:', error);
    res.status(500).json('An error occurred while deleting employee info');
  }
};


module.exports = {getAllEmployeeInfo, getSingleEmployeeInfo, addEmployeeInfo, updateEmployeeInfo, deleteEmployeeInfo};