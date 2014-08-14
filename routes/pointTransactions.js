var Express = require('express');
var Router = Express.Router();
var PointTransactionController = require('../controllers/pointTransaction')

Router.route('/')
	.get(PointTransactionController.findAll)
	.post(PointTransactionController.create);

module.exports = Router;
