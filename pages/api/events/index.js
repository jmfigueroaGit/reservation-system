import nc from 'next-connect';
import dbConnect from '@/config/dbConnect';

import { createEvent, getEvents } from '@/controllers/eventController';
import onError from '@/middlewares/errors';
import { isAuthenticatedUser } from '@/middlewares/auth';

const handler = nc({
	onError,
});

dbConnect();
handler.get(getEvents);
handler.use(isAuthenticatedUser).post(createEvent);

export default handler;
