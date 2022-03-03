import nc from 'next-connect';
import dbConnect from '@/config/dbConnect';

import { getUserEvents } from '@/controllers/eventController';
import onError from '@/middlewares/errors';
import { isAuthenticatedUser } from '@/middlewares/auth';

const handler = nc({
	onError,
});

dbConnect();
handler.use(isAuthenticatedUser).post(getUserEvents);

export default handler;
