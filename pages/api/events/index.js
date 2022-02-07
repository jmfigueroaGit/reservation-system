import nc from 'next-connect';
import dbConnect from '@/config/dbConnect';

import { createEvent, getEvents } from '@/controllers/eventController';
import onError from '@/middlewares/errors';

const handler = nc({
	onError,
});

dbConnect();
handler.post(createEvent).get(getEvents);
export default handler;
