var Express = require('express');
var BodyParser = require('body-parser');
var ExpressValidator = require('express-validator');
var UserRoutes = require('./routes/users');
var PointTransactionsRoutes = require('./routes/pointTransactions');
var Logger = require("./libs/loggers/logger");
var Config = require('config');
var Database = require('./libs/db/dataBase');
var app = Express();

//Configure/connect to our db connection
var appConfig = Config.get('app');
var db = new Database(appConfig.dbType,Config.get('db'));
db.connect();

//configure body-parser
app.use(BodyParser.json());
app.use(ExpressValidator([]));

//routes
Logger.info("Registering All Routes")

Logger.debug("Registering User Routes")
app.use('/api/users', UserRoutes); 

Logger.debug("Registering Transaction Routes")
app.use('/api/transactions', PointTransactionsRoutes); 

// catch any errors
app.use(function(err, req, res, next){
  Logger.error("Error(500) : " + err)
  res.send(500, { message: '500 Server Error' });
});

// catch all for routes
app.use(function(req, res, next){
  res.send(404, { message: '404 Not Found' });
});

module.exports = app;