var Express = require('express');
var Router = Express.Router();
var UserController = require('../controllers/user')
var PointTransactionController = require('../controllers/pointTransaction')

Router.route('/')
	.get(UserController.findAll)
	.post(UserController.create);

Router.route('/:user_id')
	.get(UserController.findById)
	.put(UserController.update)
	.delete(UserController.deleteById);

Router.route('/:user_id/transactions')
	.get(PointTransactionController.findAllByUserId)
	.post(PointTransactionController.create);
		
module.exports = Router;
