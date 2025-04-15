const express = require('express');
const bodyParser = require('body-parser');
//import database to connect with
const mongodb = require('./database/connect');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');


//Setting app to listen on port 3000
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app
  .use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }))
    //Initialize express-section
  .use(passport.initialize())
  //let passport on every route call
  .use(passport.session())
    //Allow passport access to use express-section
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Request-With, Content-Type, Accept, Z-key'
    );
    res.setHeader('Access-Control-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  
  .use(cors({method: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
  .use(cors({origin: '#'}))

  .use("/", require("./routes/index"));
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, profile);
    //});
  }
));
//Adding passport serialized and deserializeUser
passport.serializeUser((user, done) => {
  done(null, user)
});
passport.deserializeUser((user, done) => {
  done(null, user)
});
//session logged in and out endpoints
app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out')
});
//github callback passport authentication
app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

//Initializing mongodb
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        //Display Success message upon Connection
        app.listen(port, () => {
            console.log(`Database listening and Running on port`, port);
        });
    }
});