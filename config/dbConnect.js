import mongoose from 'mongoose';

const dbConnect = () => {
	if (mongoose.connection.releaseState > 1) {
		return;
	}

	mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((con) => console.log('Connected To Database'));
};

export default dbConnect;
