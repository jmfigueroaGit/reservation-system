import nc from 'next-connect';
import dbConnect from '@/config/dbConnect';

import {
	getEvent,
	updateEvent,
	deleteEvent,
} from '@/controllers/eventController';
import onError from '@/middlewares/errors';

const handler = nc({
	onError,
});

dbConnect();
handler.get(getEvent).put(updateEvent).delete(deleteEvent);
export default handler;
