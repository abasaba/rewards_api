
/**
 * This class functions as a psuedo database factory class, allowing the use of different database connectors
 */
var Database = function(type, dbConfig) {
    switch (type) {
        case "mongo":
            var DbConnector = require("./connectors/mongo");
            break;
        default:
            var DbConnector = require("./connectors/mongo");
    }
    this.dbConnector = new DbConnector(dbConfig);    
};

Database.prototype.connect = function() {
    this.dbConnector.connect();
}
 
module.exports = Database;