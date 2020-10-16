import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import { randomFruit } from '../utils';

// Schema for storing the programmable parameter data of a user
const schema = new mongoose.Schema({
	user_id: {
		type: String,
	},
	name: {
		type: String,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	_id: {
		type: String,
		default: uuid,
	},
	// Pacemaker parameters
	p_pacingState: {
		type: String,
		default: "PERMANENT",
	},
	p_pacingMode: {
		type: String,
		default: "VVI",
	},
	p_hysteresis: {
		type: Boolean,
		default: false,
	},
	p_hysteresisInterval: {
		type: Number,
		default: 300,
	},
	p_lowrateInterval: {
		type: Number,
		default: 1000,
	},
	p_vPaceAmp: {
		type: Number,
		default: 3500,
	},
	p_vPaceWidth: {
		type: Number,
		default: 0.4,
	},
	p_VRP: {
		type: Number,
		default: 320,
	},
}, 
{ 
	versionKey: false, 
});

// Middleware that runs immediately before a User is saved
schema.pre('save', async function(next) {
	// Generate a random name for the bundle
	const fruit = randomFruit();
	const bundlesByUserId = await Bundle.find({ user_id: this.user_id });
	const index = bundlesByUserId.length;
	this.name = `${fruit}-${index}`;
	next();
});

export const Bundle = mongoose.model('Bundle', schema);