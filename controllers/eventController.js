import Event from '@/models/event';
import Ticket from '@/models/ticket';
import asyncHandler from 'express-async-handler';

//  @desc   Create event
//  @route  POST /api/manage/events/create
//  @access Private
export const createEvent = asyncHandler(async (req, res) => {
	const event = await Event.create(req.body);

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
		success: true,
		event,
	});
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
