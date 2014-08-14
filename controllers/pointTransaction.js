var PointTransactionResource = require('../resources/pointTransactionResource')
var Logger = require("../libs/loggers/logger");
var Util = require('util');

/**
 * Finds all transactions
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 */
exports.findAll = function(req, res, next) {
	var promise = PointTransactionResource.findAll();
	promise
		.then(function(transactions) {
			Logger.debug("saba");
			res.json(transactions); 
		})
		.end(function (err) {
			Logger.error(err)
			next(err);
		});
};

/**
 * Creates a transaction
 * @param {Object} req 
 * @param {Object} res 
 */
exports.create = function (req,res) {
 	req.checkBody('amount', 'Invalid Amount').notEmpty().isInt();
	req.assert('user_id', 'User ID required').notEmpty();
	var user_id = req.param('user_id') ? req.param('user_id') : req.body.user_id;
	Logger.debug("ddee " + user_id);

 	var valErrors = req.validationErrors();
	if (valErrors) {
    	res.send('Validation errors: ' + Util.inspect(valErrors), 400);
  	}

  	PointTransactionResource.create(user_id, req.body.amount, function(err) {
			if (err) { res.send(422, { message: 'Failed to add Transaction' }); }
 			else { res.send(201, { message: 'Transaction Added' }); }
  	});
};

/**
 * Finds a user's transactions
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 */
exports.findAllByUserId = function (req, res, next) {
	Logger.debug(typeof next);
	var promise = PointTransactionResource.findAllByUserId(req.params.user_id)
	promise
		.then(function(transactions) {
			res.json(transactions); 
		})
		.end(function (err) {
			Logger.error(err)
			next(err);
		});
}