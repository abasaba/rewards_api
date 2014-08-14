var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
 /**
 * Mongoose schema for a user
 */
var userSchema = new Schema({
	email: {
    	type: String,
    	trim: true,
    	required: true
    },
	first_name: { 
		type: String,
		trim: true,
		required: true
	},
	last_name: { 
		type: String,
		trim: true,
		required: true
	},
	points: { 
		type: Number, 
		default: 0, 
		min: 0
	},
	updated_at: { 
		type: Date, 
		default: Date.now 
	}
});
 
module.exports = mongoose.model('User', userSchema);