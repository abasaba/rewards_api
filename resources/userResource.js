var util = require('util');
var User = require('../models/user');
var Logger = require('../libs/loggers/logger');
var PointTransactionResource = require('./pointTransactionResource');

/**
 * Finds all users
 * @return ${Promise}
 */
exports.findAll = function() {
	Logger.debug ("Finding all users");
	var promise = User.find({},'email first_name last_name points').exec();
	return promise;
};
 
/**
 * Finds a user
 * @param {String} user_d 
 * @return ${Promise}
 */
exports.findById = function(user_id) {
	Logger.debug ("Finding user with id: " + user_id);
	var promise = User.findOne({_id: user_id }, 'email first_name last_name points', { lean: true }).exec();
	return promise;
};

/**
 * Updates a user
 * @param {String} user_d 
 * @param {String} email
 * @param {String} first_name 
 * @param {String} last_name
 * @param {Function} callback
 * @param {Function} next
 */
exports.update = function(user_id, email, first_name, last_name, callback, next) {
	Logger.debug ("Updating user with id: " + user_id);

	User.findOne({ _id: user_id }, function(err, user) {
		if (err) { next(err); }
		else {
			if (email) user.email = email;
	 		if (first_name) user.first_name = first_name;
	 		if (last_name) user.last_name = last_name;
			
			user.save(function(err) {
				if (err) { 
					Logger.error("Failed to update user: " + user + " due to error: " + err);
					callback(true);
				}
				else {
					Logger.debug("User updated");
					callback(false);
				}
			});
		}
	});
};

/**
 * Creates a user
 * @param {String} email
 * @param {String} first_name 
 * @param {String} last_name
 * @param {Function} callback
 * @param {Function} next
 */
exports.create = function(email, first_name, last_name, callback, next) {
	Logger.debug ("Creating user");

	var user = new User({
			email : email,
			first_name : first_name,
			last_name : last_name
	});

	user.save(function(err) {
		if (err) {
			Logger.error ("Failed to save user: " + user + " due to error: " + err);
			callback(true);
		}
		else { 
			Logger.debug ("Saved user: " + user);
			callback(false); 
		}
	});
};

/**
 * Deletes a user
 * @param {String} user_d 
 * @param {Function} callback
 * @param {Function} next
 */
exports.deleteById = function(user_id, callback, next) {
 	Logger.debug ("Start deleting user id: " + user_id);

 	PointTransactionResource.deleteAllByUserId(user_id, function(err) {
		if (err) { 
			next(err); 
		}
		else { 	
			User.remove({ _id: user_id }, function(err) {
				if (err) {
					Logger.error ("Failed to delete user with id: " + user_id + " due to error: " + err);
					callback(true);
				}
				else { 
					Logger.debug ("Deleted user with id: " + user_id);
					callback(false); 
				}
			});	 
		}
  	});
};

/**
 * Updates a user's total point count
 * @param {String} user_d 
 * @param {Integer} amount
 * @param {Function} callback
 */
exports.addAmountIfPossible = function(user_id, amount, callback) {
	Logger.debug("Adding points to user");
	User.findOne({ _id: user_id }, function(err, user) {
		if (err) { 
			Logger.error(err);
			next(err);
		}
		else {
			Logger.debug("User with id: " + user_id + " has " + user.points + " points. Trying to add " + amount);
			var total = user.points + amount;
			if ( total < 0 ) {
				Logger.debug("Cannot update user's mount. The total is less than zero: " + total);
				callback(true);
			}
			else {
				user.points = total;
				user.save(function(err) {
					if (err) { 
						Logger.error(err);
						callback(true);
					}
					else { callback(false); }
				});
			}
		}
	});
};
