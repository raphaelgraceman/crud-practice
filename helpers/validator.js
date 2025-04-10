const Validator = require('validatorjs');  

const validateInput = (body, rules, customMessages, callback) => {  
    const validation = new Validator(body, rules, customMessages); 

    if (validation.passes()) { 
        callback(null, true);  
    } else {  
        callback(validation.errors, false); 
    }  
};  

module.exports = validateInput;   