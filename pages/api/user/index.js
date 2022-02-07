import nc from 'next-connect';
import dbConnect from '@/config/dbConnect';

import { registerUser, currentUserProfile } from '@/controllers/userController';
import onError from '@/middlewares/errors';
import { isAuthenticatedUser } from '@/middlewares/auth';
const handler = nc({
	onError,
});

dbConnect();
handler.post(registerUser);
handler.use(isAuthenticatedUser).get(currentUserProfile);
export default handler;
