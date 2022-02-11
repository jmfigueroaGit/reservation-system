import Ticket from '@/models/ticket';
import Event from '@/models/event';
import asyncHandler from 'express-async-handler';

//  @desc   Create ticket
//  @route  POST  /api/manage/events/:id/ticket
//  @access Private
export const createTicket = asyncHandler(async (req, res) => {
	const event = await Event.findById(req.query.id);
	const { isFree, name, available, price, dateTime, ticketPerOrder } = req.body;

	if (!event) {
		res.status(500);
		throw new Error('Event ID not found');
	}
	const ticket = await Ticket.create({
		event: req.query.id,
		isFree,
		name,
		available,
		price,
		dateTime,
		ticketPerOrder,
	});

	if (ticket) {
		res.status(201).json({
			success: true,
			ticket,
		});
	} else {
		res.status(500);
		throw new Error('Invalid data input');
	}
});

//  @desc   Get All Tickets
//  @route  GET  /api/manage/events/:id/ticket/
//  @access Private
export const getTickets = asyncHandler(async (req, res) => {
	const tickets = await Ticket.find({ event: req.query.id });
	const ticketsCount = await Ticket.countDocuments({ event: req.query.id });
	res.status(200).json({ success: true, count: ticketsCount, tickets });
});

//  @desc   Get Single Ticket
//  @route  GET  /api/manage/events/:id/ticket/:ticketId
//  @access Private
export const getTicket = asyncHandler(async (req, res) => {
	const ticket = await Ticket.findById(req.query.ticketId).populate({
		path: 'event',
		select: 'title',
	});

	res.status(200).json({ success: true, ticket });
});

//  @desc   Update Single Ticket
//  @route  PUT  /api/manage/events/:id/ticket/:ticketId
//  @access Private
export const updateTicket = asyncHandler(async (req, res) => {
	const ticket = await Ticket.findOneAndUpdate(req.query.ticketId, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	if (!ticket) {
		res.status(404);
		throw new Error('Ticket not found');
	}

	res.status(201).json({
		success: true,
		ticket,
	});
});

//  @desc   Delete Single Ticket
//  @route  DELETE  /api/manage/events/:id/ticket/:ticketId
//  @access Private
export const deleteTicket = asyncHandler(async (req, res) => {
	const ticket = await Ticket.findById(req.query.ticketId);

	if (ticket) {
		await ticket.remove();
		res.json({
			message: 'Ticket was successfully deleted',
		});
	} else {
		res.status(400);
		throw new Error('Ticket not found with this id');
	}
});
