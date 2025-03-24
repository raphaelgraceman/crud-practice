const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//import database to connect with
const mongodb = require('./database/connect');


//Setting app to listen on port 3000
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Request-With, Content-Type, Accept, Z-key'
    );
    res.setHeader('Access-Control-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  
 app.use("/", require("./routes"));
  
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});


//Initializing mongodb
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else
    {
        //Display Success message upon Connection
        app.listen(port, () => {
            console.log('Server published and Running on port', port);
        });
    }
});