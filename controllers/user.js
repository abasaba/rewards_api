var UserResource = require('../resources/userResource')
var PointTransactionResource = require('../resources/pointTransactionResource')
var Logger = require("../libs/loggers/logger");
var Util = require('util');

/**
 * Finds all users
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 */
exports.findAll = function(req, res, next) {
	var promise = UserResource.findAll();
	promise
		.then(function(users) {
			res.json(users); 
		})
		.end(function (err) {
			Logger.error(err)
			next(err);
		});
};

/**
 * Finds all a specific user
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 */
exports.findById = function(req, res, next) {
	var promise = UserResource.findById(req.params.user_id);
	promise
		.then(function(user) {
			if (user === null) { next()}
 			else { 
				if (req.query.with && req.query.with === "transactions") {
					var promise = PointTransactionResource.findAllByUserId(req.params.user_id)
					promise
						.then(function(transactions) {
							user.transactions=transactions;
							res.json(user); 
						})
						.end(function (err) {
							Logger.error(err)
							next(err);
						});
				}
				else {res.json(user);}
 			}	
		})
		.end(function (err) {
			Logger.error(err)
			next(err);
		});
};

/**
 * Updates a user
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 */
exports.update = function(req, res, next) {	
  	UserResource.update(req.params.user_id, req.body.email, req.body.first_name, req.body.last_name, function(err) {
		if (err) { res.send(400, { message: 'Failed to update user' }); }
 		else { res.send(201, { message: 'User updated' }); }
  	});
};

/**
 * Creates a user
 * @param {Object} req 
 * @param {Object} res 
 */
exports.create = function(req, res) {
 	req.checkBody('email', 'Email required').notEmpty();
	req.checkBody('first_name', 'First name required ').notEmpty();
	req.checkBody('last_name', 'Last name required ').notEmpty();

 	var valErrors = req.validationErrors();
	if (valErrors) {
    	res.send('Validation errors: ' + Util.inspect(valErrors), 400);
  	}

  	UserResource.create(req.body.email, req.body.first_name, req.body.last_name, function(err) {
		if (err) { res.send(400, { message: 'Failed to create user' }); }
 		else { res.send(201, { message: 'User created' }); }
  	});
 };

/**
 * Deletes a user
 * @param {Object} req 
 * @param {Object} res 
 */
 exports.deleteById = function(req, res) {
  	UserResource.deleteById(req.params.user_id, function(err) {
		if (err) { res.send(400, { message: 'Failed to delete user' }); }
 		else { res.send(201, { message: 'User deleted' }); }
  	});
 };





