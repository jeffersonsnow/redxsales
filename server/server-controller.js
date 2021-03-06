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
    // console.log(req.user);
    if(req.user){
      res.json(req.user);
    } else {
      console.log('Unauthorized');
      res.json('Unauthorized');
    }
  },

  postSale: function(req, res, next){
    var body = req.body;
    console.log(req.body.time, 'this is date coming back');
    db.post_sale([body.rep, body.time, body.name, body.amount, body.setupfee, body.plan,
      body.expireds, body.fsbos, body.frbos, body.pfcs, body.onyx, body.storm,
      body.geo, body.stormMulti, body.user_id], function(err, response){
        if(err){
          console.log("error, dude!", err);
          return res.json(err);
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
  },

  getDailySales: function(req, res, next){
    db.get_daily_sales([],function(err, response){
      if(err){
        console.log('Failure on get daily sales');
        res.json(err);
      } else {
        console.log('did we get daily sales?');
        res.json(response);
      }
    });
  },

  getAllUsers: function(req, res, next){
    db.get_all_users([], function(err, response){
      if(err){
        console.log("failure on getting users");
        res.json(err);
      } else{
        console.log("success on getting users?");
        res.json(response);
      }
    });
  },
  getQuota: function(req, res, next){
    db.get_quota([], function(err, response){
      if(err){
        console.log('failure on getting quota');
        res.json(err);
      }else{
        console.log('Success on getting quota?');
        res.json(response);
      }
    });
  },
  getMonthlyTotal: function(req, res, next){
    if(req.params.id){
    db.get_monthly_total([req.params.id], function(err, response){
      if(err){
      console.log('failure on getting monthly total');
      return next(err);
    }else{
      console.log('Success on getting quota?');
      res.json(response);
    }
  });
  }
},

createQuota: function(req, res, next){
  db.create_quota([req.body.quota_amount, req.body.quota_time], function(err, response){
    if(err){
      console.log('failed to post quota');
      return next(err);
    }else{
      console.log('Success on posting quota?');
      res.json(response);
    }
  });
},

getAllmonthlySales: function(req, res, next){
  db.get_all_monthly_sales([], function(err, response){
    if(err){
      console.log('failed to get all sales');
      return next(err);
    }else{
      console.log('retrieved all sales?');
      res.json(response);
    }
  });
}


};
