import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		title: {
			type: String,
			required: true,
		},
		organization: {
			type: String,
		},
		type: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		location: {
			venue: {
				onSite: { type: Boolean },
				addLocation: { type: String },
			},
			online: { type: Boolean },
			tba: { type: Boolean },
		},
		dateTime: {
			eventStart: {
				type: Date,
				required: true,
			},
			eventEnd: {
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
		details: {
			mainEventImage: {
				public_id: {
					type: String,
				},
				url: {
					type: String,
				},
			},
			description: {
				type: String,
			},
			additional: [
				{
					text: {
						type: String,
					},
					image: {
						public_id: {
							type: String,
						},
						url: {
							type: String,
						},
					},
					video: {
						type: String,
					},
				},
			],
		},
		onlineEvent: {
			link_url: { type: String },
			image: {
				public_id: {
					type: String,
				},
				url: {
					type: String,
				},
			},
			text: {
				type: String,
			},
			video: {
				link: {
					type: String,
				},
			},
		},
		publish: {
			type: Boolean,
			default: false,
		},
		public: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

mongoose.models = {};
export default mongoose.model.Event || mongoose.model('Event', eventSchema);
