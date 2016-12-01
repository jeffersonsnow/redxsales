var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var session = require('express-session');
var connectionString = "postgres://Snow@localhost/redxsalesteam";
var massiveInstance = massive.connectSync({connectionString : connectionString});

var config = require('./config.js');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

//var app = express();
var app = module.exports = express();
app.use(express.static(__dirname + './../public'));

app.use(bodyParser.json());
app.use(cors());
app.set('db', massiveInstance);
var db = app.get('db');
var controller = require('./server-controller.js');

app.use(session({
 secret: config.secret,
 resave: true,
 saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(new GoogleStrategy({
    clientID: config.googleKey,
    clientSecret: config.googleSecret,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log(profile);
    db.users.findOne({google_id: profile.id}, function(err, dbRes) {
      if (dbRes === undefined) {
        console.log("User not found. Creating...");
        db.users.insert({name: profile.displayName, type: 'client', google_id: profile.id, photo: profile.photos[0].value} , function(err, dbRes) {
          return done(null, dbRes);
        });
      } else {
        console.log("Existing user found.");
        return done(null, dbRes);
      }
    });
  }
));

app.get('/auth/google', passport.authenticate('google',{scope: ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']}));
app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/#/' }),
  function(req, res) {
  res.redirect('/#/home');
  // console.log("this is the droid you're looking for");
  // res.send(req.user);
  });


  // app.get('/auth/google/callback',
  //   passport.authenticate('google', {
  //     successRedirect: '/me',
  //     failureRedirect: '/#/' }),
  //   function(req, res) {
  //   console.log(req.session);
  //   });
  //

  passport.serializeUser(function(user, done) {
    done(null, user);
  }); //preps data to put on session

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });//gets data from session and preps for req.user

  app.get('/me', function(req, res){
    console.log('check this out');
    res.send(req.user);
  });


// app.set('db', massiveInstance);
// var db = app.get('db');
// var controller = require('./server-controller.js');
//google oAuth stuff https://github.com/jaredhanson/passport-google-oauth2

app.post('/api/dailyfocus', controller.createFocus);
app.post('/api/sales', controller.postSale);
app.get('/api/dailyfocus/:id', controller.getCurrentFocus);
app.get('/api/allfocuses/:id', controller.getAllFocuses);
app.get('/api/authentication', controller.checkAuth);
app.get('/api/weeklysales/:id', controller.getSalesForWeek);
app.get('/api/dailysales/', controller.getDailySales);



app.listen(3000, function(){
  console.log('Listening on port 3000');
});
