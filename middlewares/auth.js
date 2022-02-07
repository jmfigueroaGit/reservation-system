import asyncHandler from 'express-async-handler';
import { getSession } from 'next-auth/react';

export const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
	const session = await getSession({ req });

	if (!session) {
		res.status(401);
		throw new Error(session);
	}

	req.user = session.user;
	next();
});
