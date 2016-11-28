var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var connectionString = "postgres://Snow@localhost/redxsalesteam";
var massiveInstance = massive.connectSync({connectionString : connectionString});

//var app = express();
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

app.set('db', massiveInstance);
var db = app.get('db');
var controller = require('./server-controller.js');
//google oAuth stuff https://github.com/jaredhanson/passport-google-oauth2

app.post('/api/dailyfocus', controller.createFocus);
app.get('/api/dailyfocus', controller.getCurrentFocus);


app.listen(3000, function(){
  console.log('Listening on port 3000');
});
