import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
	{
		event: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Event',
		},
		isFree: { type: Boolean, default: false },
		name: {
			type: String,
			required: true,
		},
		available: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
		},
		dateTime: {
			salesStart: {
				type: Date,
				required: true,
			},
			salesEnd: {
				type: Date,
				required: true,
			},
			startTime: {
				type: String,
				required: true,
			},
			endTime: {
				type: String,
				required: true,
			},
		},
		ticketPerOrder: {
			minQuantity: {
				type: Number,
				default: 1,
			},
			maxQuantity: {
				type: Number,
				default: 1,
			},
			salesChannel: {
				type: String,
			},
		},
	},
	{
		timestamps: true,
	}
);

mongoose.models = {};
export default mongoose.model.Ticket || mongoose.model('Ticket', ticketSchema);
