import nc from 'next-connect';
import dbConnect from '@/config/dbConnect';

import { createTicket, getTickets } from '@/controllers/ticketController';
import onError from '@/middlewares/errors';

const handler = nc({
	onError,
});

dbConnect();
handler.get(getTickets).post(createTicket);
export default handler;
