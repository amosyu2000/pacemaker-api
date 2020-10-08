import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

// Schema for storing the programmable parameter data of a user
const schema = new mongoose.Schema({
	created_at: {
		type: Date,
		default: Date.now,
	},
	p_lowrateInterval: {
		type: Number,
		default: 1000,
	},
	user_id: {
		type: String
	},
	_id: {
		type: String,
		default: uuid,
	},
}, 
{ 
	versionKey: false, 
});

export const Config = mongoose.model('Config', schema);