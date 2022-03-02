import asyncHandler from 'express-async-handler';
import { getSession } from 'next-auth/react';

export const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
	const session = await getSession({ req });

	if (!session) {
		res.status(401);
		throw new Error('Login first to access this resource', 401);
	}

	req.user = session.user;
	next();
});
