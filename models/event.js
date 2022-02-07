import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		image: {
			public_id: {
				type: String,
			},
			url: {
				type: String,
			},
		},
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		isPaid: {
			type: Boolean,
			default: false,
		},
		date: {
			type: String,
			required: true,
		},
		url: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

mongoose.models = {};
export default mongoose.model.Event || mongoose.model('Event', eventSchema);
