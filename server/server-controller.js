var app = require('./index.js');
var db = app.get('db');
module.exports = {

  createFocus: function(req, res, next){
        db.create_focus([req.body.focus, req.body.time, req.body.user_id], function(err, response){
          if(err){
            res.json(err);
          }
          else {
          res.json(response);
        }
      });
},

  getCurrentFocus: function(req, res, next){
      if(req.params.id){
      db.get_current([req.params.id], function(err, response){
        if(err){
          console.log('error, dude!', err);
          res.json(err);
        } else {
          res.json(response);
        }
      });
    }
},
  getAllFocuses: function(req, res, next){
    if(req.params.id){
      console.log('step in');
    db.get_all_focuses([req.params.id], function(err, response){
      if(err){
        console.log('Game over, man!');
        res.json(err);
      }else{
        console.log('Working?');
        res.json(response);
      }
    });
    }
  },

  checkAuth: function(req, res, next){
    console.log(req.user);
    if(req.user){
      res.json(req.user);
    } else {
      console.log('Unauthorized');
      res.json('Unauthorized');
    }
  },

  postSale: function(req, res, next){
    var body = req.body;
    db.post_sale([body.rep, body.time, body.name, body.amount, body.setupfee,
      body.expireds, body.fsbos, body.frbos, body.preforeclosures, body.onyx, body.storm,
      body.geo, body.stormMulti, body.user_id], function(err, response){
        if(err){
          console.log("error, dude!", err);
          res.json(err);
        }
        else {
        console.log("Sale posted?");
        res.json(response);
      }
    });
  },

  getSalesForWeek: function(req, res, next){
    if(req.params.id){
      console.log('step into getSalesForWeek');
    db.get_weeks_sales([req.params.id], function(err, response){
      if(err){
        console.log('Failure on get Sales');
        res.json(err);
      } else {
        console.log('get sales working?');
        res.json(response);
      }
    });
    }
  }

};
