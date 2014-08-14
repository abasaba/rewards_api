var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

/**
 * Mongoose schema for a points' transaction
 */
var pointTranactionSchema = new Schema({
	user_id: {
    	type: Schema.ObjectId,
    	ref: 'userSchema',
    	trim: true,
    	required: true
    },
	amount: { 
		type: Number,
		required: true 
	},
	created_at: { 
		type: Date, 
		default: Date.now 
	}
});

module.exports = Mongoose.model('PointTransaction', pointTranactionSchema);