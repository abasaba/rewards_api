var Logger = require("../../loggers/logger");
var Mongoose = require('mongoose');

/**
 * Creates a Mongo connector to be used by the application. It uses the 'mongoose' framework.
 */
var MongoConnector = function(dbConfig) {
	this.dbConfig = dbConfig;
	var credString;
	if (dbConfig.user != null) { credString = dbConfig.user + ":"+ dbConfig.pass + "@"; }
	this.baseConnectionString = 'mongodb://' + credString + dbConfig.host + ':' + dbConfig.port + '/'
}

MongoConnector.prototype.connect = function() {
	var connectionString = this.baseConnectionString + this.dbConfig.dbName;
    Mongoose.connect(connectionString, function(err, next) {
    	if (err){ Logger.error("Mongo connector error with connection string " + connectionString + " : " + err) }
    	else{ Logger.debug("Connected to DB with connection string: " + connectionString); }
    });
}

module.exports = MongoConnector;