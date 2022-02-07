import Event from '@/models/event';
import asyncHandler from 'express-async-handler';

//  @desc   Create event
//  @route  POST /api/events
//  @access Private
export const createEvent = asyncHandler(async (req, res) => {
	const { name, description, location, date } = req.body;

	const event = await Event.create({
		name,
		description,
		location,
		date,
	});

	if (event) {
		res.status(201).json({
			success: true,
			event,
		});
	} else {
		res.status(400);
		throw new Error('Invalid Data Input');
	}
});

//  @desc   Get all events
//  @route  GET /api/events
//  @access Public
export const getEvents = asyncHandler(async (req, res) => {
	const events = await Event.find();

	res.status(200).json({
		success: true,
		events,
	});
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
		res.status(200).json({
			success: true,
			event,
		});
	}
});

//  @desc   Update  event
//  @route  PUT /api/events/:id
//  @access Private
export const updateEvent = asyncHandler(async (req, res) => {
	const event = await Event.findOneAndUpdate(req.query.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	if (!event) {
		res.status(400);
		throw new Error('Event not found');
	}

	res.status(201).json({
		success: true,
		event,
	});
});

//  @desc   Delete  event
//  @route  DELETE /api/events/:id
//  @access Private
export const deleteEvent = asyncHandler(async (req, res) => {
	const event = await Event.findById(req.query.id);

	if (event) {
		await event.remove();
		res.json({
			message: 'Event was successfully removed',
		});
	} else {
		res.status(400);
		throw new Error('Event not found with this ID');
	}
});
