import mongoose from 'mongoose';
import hash from 'object-hash';
import { v4 as uuid } from 'uuid';

const schema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		validate: {
			validator: /^[a-zA-Z0-9_]{3,16}$/, 
			message: "Usernames must be 3 to 16 characters long and contain only alphanumeric characters and underscores (_)."
		},
	},
	username_lower: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
	_id: {
		type: String,
		required: true,
		default: uuid,
	},
	created_at: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

schema.pre('save', function(next) {
	this.password = hash(this.password);
	this.username_lower = this.username.toLowerCase();
	next();
});

schema.methods.authenticate = function(password) {
	return this.password === hash(password);
}

export const User = mongoose.model('User', schema);
