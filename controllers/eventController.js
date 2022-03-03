import Event from '@/models/event';
import Ticket from '@/models/ticket';
import User from '@/models/user';
import asyncHandler from 'express-async-handler';

//  @desc   Create event
//  @route  POST /api/manage/events/create
//  @access Private
export const createEvent = asyncHandler(async (req, res) => {
	const user = await User.findOne({ email: req.user.email });

	if (!user) {
		res.status(404);
		throw new Error('User not found with this email');
	}

	const event = await Event.create({ user: user._id, ...req.body });
	if (event) {
		res.status(201).json({
			event,
		});
	} else {
		res.status(400);
		throw new Error('Invalid Data Input');
	}
});

//  @desc   Update Event's Details
//  @route  PUT /api/manage/events/:id/basicinfo
//  @route  PUT /api/manage/events/:id/details
//  @route  PUT /api/manage/events/:id/publish
//  @route  PUT /api/manage/events/:id/publish
//  @access Private
export const updateEvent = asyncHandler(async (req, res) => {
	const event = await Event.findOneAndUpdate(req.query.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	if (!event) {
		res.status(404);
		throw new Error('Event not found');
	}

	res.status(201).json({
		event,
	});
});

//  @desc   Get all events
//  @route  GET /api/events
//  @access Public
export const getEvents = asyncHandler(async (req, res) => {
	const events = await Event.find().populate('user');

	res.status(200).json(events);
});

//  @desc   Get user's events
//  @route  POST /api/events
//  @access Public
export const getUserEvents = asyncHandler(async (req, res) => {
	const events = await Event.find({ user: req.body.id }).populate('user');

	res.status(200).json(events);
});

//  @desc   Get single event
//  @route  GET /api/events/:id
//  @access Public
export const getEvent = asyncHandler(async (req, res) => {
	const event = await Event.findById(req.query.id);

	if (!event) {
		res.status(400);
		throw new Error('Event not found with this ID');
	} else {
		res.status(200).json(event);
	}
});

//  @desc   Delete  event
//  @route  DELETE /api/manage/events/:id/publish
//  @access Private
export const deleteEvent = asyncHandler(async (req, res) => {
	const event = await Event.findById(req.query.id);

	if (event) {
		await event.remove();
		await Ticket.deleteMany({ event: req.query.id });
		res.json({
			message: 'Event was successfully removed',
		});
	} else {
		res.status(400);
		throw new Error('Event not found with this ID');
	}
});
