import nc from 'next-connect';
import dbConnect from '@/config/dbConnect';

import { getTicket } from '@/controllers/ticketController';
import onError from '@/middlewares/errors';

const handler = nc({
	onError,
});

dbConnect();
handler.get(getTicket);
export default handler;
