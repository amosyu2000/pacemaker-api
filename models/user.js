import mongoose from 'mongoose';
import hash from 'object-hash';
import { v4 as uuid } from 'uuid';
import { Bundle } from '../models';

// Schema for a user
const schema = new mongoose.Schema({
	username: {
		type: String,
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
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	_id: {
		type: String,
		default: uuid,
	}
}, 
	// Configuration for the schema
{ 
	versionKey: false, 
});

// Middleware that runs immediately before a User is saved
schema.pre('save', function(next) {

	// Hash the password that was passed in
	this.password = hash(this.password);

	// Create a username_lower field that is useful for avoiding username conflicts
	this.username_lower = this.username.toLowerCase();
	next();
});

// Middleware that runs immediately after a User is deleted
schema.post('findOneAndDelete', async function(doc, next) {

	// Deletes all associated Bundle documents immediately when a User is deleted
	await Bundle.deleteMany({ user_id: doc.id });
	next();
})

// Checks whether the argument matches the password in the Document
schema.methods.authenticate = function(password) {
	return this.password === hash(password);
}

export const User = mongoose.model('User', schema);
