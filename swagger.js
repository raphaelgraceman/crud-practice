const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CRUD API',
    description: 'CRUD PRACTICE API'
  },
  host: 'crud-practice-jtlg.onrender.com',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// auto generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);