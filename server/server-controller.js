var app = require('./index.js');
var db = app.get('db');
module.exports = {

  createFocus: function(req, res, next){
        db.create_focus([req.body.focus, req.body.time], function(err, response){
          if(err){
            console.log("error, dude!", err);
            res.json(err);
          }
          else {
          console.log("I got this far");
          res.json(response);
        }
      });
},

  getCurrentFocus: function(req, res, next){
      db.get_current([], function(err, response){
        if(err){
          console.log('error, dude!', err);
          res.json(err);
        } else {
          console.log('Did it work?');
          res.json(response);
        }
      });
},
  getAllFocuses: function(req, res, next){
    db.get_all([], function(err, response){
      if(err){
        console.log('Game over, man!');
        res.json(err);
      }else{
        console.log('Working?');
        res.json(response);
      }
    });
  },

  checkAuth: function(req, res, next){
    console.log(req.user);
    if(req.user){
      res.json(req.user);
    } else {
      console.log('Unauthorized');
      res.json('Unauthorized');
    }
  }

};
