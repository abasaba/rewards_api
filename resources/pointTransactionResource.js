var PointTransaction = require('../models/pointTransaction');
var ObjectId = require('mongoose').Types.ObjectId;
var Logger = require("../libs/loggers/logger");
var UserResource = require("./userResource");

/**
 * Finds all transactions
 * @return ${Promise}
 */
exports.findAll = function() {
	Logger.info ("Finding all transactions");
	var promise = PointTransaction.find({}, 'user_id amount created_at').exec();
	return promise;
};

/**
 * Finds a user's transactions
 * @param {String} user_id 
 * @return ${Promise}
 */
exports.findAllByUserId = function(user_id) {
	Logger.debug ("Getting transactions for user : " + user_id);
	var promise = PointTransaction.find({'user_id' : user_id}, 'user_id amount created_at').exec();
	return promise;	
};

/**
 * Deletes a user's transactions
 * @param {String} user_d 
 * @param {Function} callback 
 * @param {Function} next
 */
exports.deleteAllByUserId = function(user_id, callback, next) {
	Logger.debug ("Deleting transactions for user : " + user_id);
	PointTransaction.remove({ user_id: user_id }, function(err) {
		if (err) {
			Logger.error ("Failed to delete transactions for user id: " + user_id + " due to error: " + err);
			callback(true);
		}
		else { 
			Logger.debug ("Deleted transactions for user id: " + user_id);
			callback(false); 
		}
	});
};


/**
 * Creates a transaction
 * @param {String} user_d 
 * @param {Integer} amount
 * @param {Function} callback 
 */
exports.create = function(user_id, amount, callback) {
	Logger.info ("Verifying user point total");
	UserResource.addAmountIfPossible(user_id, amount, function (err){
		if (err) { callback(true); }
		else {
			Logger.info ("Creating transaction");

		  	var transaction = new PointTransaction({
						user_id : user_id,
						amount : amount
			});

			transaction.save(function(err) {
				if (err) {
					Logger.error ("Failed to save transaction: " + transaction + " due to error: " + err);
					callback(true);
				}
				else { 
					Logger.debug ("Saved transaction: " + transaction);
					callback(false); 
				}
			});
		}
	})
};