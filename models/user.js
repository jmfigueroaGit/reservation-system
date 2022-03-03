import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import crypto from 'crypto';
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'This field is required'],
		},
		email: {
			type: String,
			required: [true, 'This field is required'],
			validator: [validator.isEmail, 'Please enter valid email address'],
			unique: true,
		},
		avatar: {
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
		password: {
			type: String,
			required: [true, 'This field is required'],
			select: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		resetPasswordToken: String,
		resetPasswordExpire: Date,
	},
	{
		timestamps: true,
	}
);

userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = bcrypt.genSaltSync(10);
	this.password = await bcrypt.hashSync(this.password, salt);
});

//  Generate password token
userSchema.methods.getResetPasswordToken = function () {
	//  Generate token
	const resetToken = crypto.randomBytes(20).toString('hex');

	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
	return resetToken;
};

mongoose.models = {};
export default mongoose.model.User || mongoose.model('User', userSchema);
