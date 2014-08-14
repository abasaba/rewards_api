var Logger = require("../../loggers/logger");
var Mongoose = require('mongoose');

/**
 * Creates a Mongo connector to be used by the application. It uses the 'mongoose' framework.
 */
var MongoConnector = function(dbConfig) {
	this.dbConfig = dbConfig;
	this.baseConnectionString = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/'
}

MongoConnector.prototype.connect = function() {
	var connectionString = this.baseConnectionString + this.dbConfig.dbName;
    Mongoose.connect(connectionString);
   	Logger.debug("Connected to DB with connection string: " + connectionString);
}

module.exports = MongoConnector;