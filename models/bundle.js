import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

// Schema for storing the programmable parameter data of a user
const schema = new mongoose.Schema({
	created_at: {
		type: Date,
		default: Date.now,
	},
	user_id: {
		type: String
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

export const Bundle = mongoose.model('Bundle', schema);