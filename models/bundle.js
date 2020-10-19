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
	MODE: { type: Number, default: 1 },
	LOWER_RATE_LIMIT: { type: Number, default: 60 },
	VOLTAGE: { type: Number, default: 3.3 },
	UPPER_RATE_LIMIT: { type: Number, default: 120 },
	MAX_SENS: { type: Number, default: 0 },
	AV_DELAY_FIXED: { type: Number, default: 0 },
	AV_DELAY_DYNA: { type: Number, default: 0 },
	AV_DELAY_SENSED: { type: Number, default: 0 },
	ATR_AMP: { type: Number, default: 3.5 },
	VENT_AMP: { type: Number, default: 3.5 },
	ATR_PW: { type: Number, default: 10 },
	VENT_PW: { type: Number, default: 10 },
	ATR_SENS: { type: Number, default: 2.4 },
	VENT_SENS: { type: Number, default: 2.4 },
	VRP: { type: Number, default: 320 },
	ARP: { type: Number, default: 250 },
	PVARP: { type: Number, default: 250 },
	PVARP_EXT: { type: Number, default: 0 },
	HYSTERESIS: { type: Number, default: 0 },
	RATE_SMOOTH: { type: Number, default: 0 },
	ATR_DUR: { type: Number, default: 0 },
	ATR_FALLBACK_MODE: { type: Number, default: 0 },
	ATR_FALLBACK_TIME: { type: Number, default: 0 },
	ACTIVITY_THRESH: { type: Number, default: 0 },
	VENT_THRESH: { type: Number, default: 2.2 },
	ATR_THRESH: { type: Number, default: 1.8 },
	REACT_TIME: { type: Number, default: 0 },
	RESP_FACTOR: { type: Number, default: 0 },
	RCVR_TIME: { type: Number, default: 0 },
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