import nc from 'next-connect';
import dbConnect from '@/config/dbConnect';

import { findEmail } from '@/controllers/userController';
import onError from '@/middlewares/errors';

const handler = nc({
	onError,
});

dbConnect();
handler.post(findEmail);
export default handler;
