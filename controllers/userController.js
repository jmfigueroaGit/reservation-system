import User from '@/models/user';
import sendEmail from '@/utils/sendEmail';
import asyncHandler from 'express-async-handler';
import crypto from 'crypto';
import absoluteUrl from 'next-absolute-url';
import cloudinary from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

//  @desc   Register user
//  @route  POST /api/auth
//  @access Public
export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
		folder: 'dubupod/avatars',
		width: '150',
		crop: 'scale',
	});

	const emailExists = await User.findOne({ email });

	if (emailExists) {
		res.status(400);
		throw new Error('Email is already used');
	}

	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: result.public_id,
			url: result.secure_url,
		},
	});

	if (user) {
		res.status(201).json({
			success: true,
			message: 'Account registered successfully',
		});
	} else {
		res.status(500);
		throw new Error('Invalid data input');
	}
});

//  @desc   Get current user
//  @route  POST /api/user
//  @access Private
export const currentUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findOne({ email: req.user.email });
	res.status(200).json({
		user,
	});
});

//  @desc   Update current user
//  @route  PUT /api/user
//  @access Private
export const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findOneAndUpdate(req.user._id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	}).select('+password');

	if (!user) {
		res.status(400);
		throw new Error('User not found');
	}

	res.status(201).json({
		success: true,
		user,
	});
});

//  @desc   Find Email
//  @route  POST /api/password/forgot
//  @access Public
export const findEmail = asyncHandler(async (req, res) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		res.status(404);
		throw new Error('User not found with this email');
	}

	res.status(200).json({
		success: true,
		email: req.body.email,
	});
});

//  @desc   Find By Id
//  @route  POST /api/password/forgot
//  @access Public
export const findUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.body.id);

	if (!user) {
		res.status(404);
		throw new Error('User not found with this email');
	}

	res.status(200).json(user);
});

//  @desc   Forgot Password Reset
//  @route  POST /api/password/forgot
//  @access Public
export const forgotPassword = asyncHandler(async (req, res) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		res.status(404);
		throw new Error('User not found with this email');
	}

	//  Get Reset Token
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	//  Get origin
	const { origin } = absoluteUrl(req);

	//  Create reset password url
	const resetUrl = `${origin}/password/reset/${resetToken}`;

	const message = `Your password reset url is as follow: \n\n ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Dubupod Password Recovery',
			message,
		});
		res.status(200).json({
			success: true,
			message: `Email sent to: ${user.email}`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });
		res.status(500);
		throw new Error(error.message);
	}
});

//  @desc   Reset Password Token
//  @route  POST /api/password/reset/:token
//  @access Public
export const resetPassword = asyncHandler(async (req, res) => {
	// Hash URL Token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.query.token)
		.digest('hex');

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		res.status(400);
		throw new Error('Password reset token is invalid or has been expired');
	}

	// Setup the new password
	user.password = req.body.password;

	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	res.status(200).json({
		success: true,
		message: 'Password Updated Successfully',
	});
});
