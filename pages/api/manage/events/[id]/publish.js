import nc from 'next-connect';
import dbConnect from '@/config/dbConnect';

import { updateEvent, deleteEvent } from '@/controllers/eventController';
import onError from '@/middlewares/errors';

const handler = nc({
	onError,
});

dbConnect();
handler.put(updateEvent).delete(deleteEvent);
export default handler;
