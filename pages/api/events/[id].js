import nc from 'next-connect';
import dbConnect from '@/config/dbConnect';

import { getEvent } from '@/controllers/eventController';
import onError from '@/middlewares/errors';

const handler = nc({
	onError,
});

dbConnect();
handler.get(getEvent);
export default handler;
