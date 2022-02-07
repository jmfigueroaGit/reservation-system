import React, { useEffect } from 'react';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '@/actions/userAction';
import { signOut } from 'next-auth/react';
import LoadingScreen from './LoadingScreen';
import absoluteUrl from 'next-absolute-url';
export default function Header() {
	const dispatch = useDispatch();

	const { loading, user } = useSelector((state) => state.loadedUser);

	useEffect(() => {
		if (!user) dispatch(loadUser());
	}, [dispatch, user]);

	const logoutHandler = () => {
		signOut({ callbackUrl: `/login` });
	};

	return (
		<>
			{loading ? (
				<LoadingScreen />
			) : (
				<nav className="flex flex-wrap items-center justify-between p-6 sticky-top bg-[#25294A]">
					<div className="flex items-center flex-shrink-0 mr-6 text-white">
						<h1 className="text-2xl font-bold tracking-widest">
							<span className="text-gray-100">DUBU</span>
							<span className="text-blue-500">PUD</span>
						</h1>
					</div>
					<div className="block w-full lg:flex lg:items-center lg:w-auto">
						{!user ? (
							<div className="text-md lg:flex-grow">
								<Link href="/login">
									<a className="block mt-4 mr-4 text-indigo-200 lg:inline-block lg:mt-0 hover:text-white">
										Login
									</a>
								</Link>
								<Link href="/register">
									<a className="block mt-4 mr-4 text-indigo-200 lg:inline-block lg:mt-0 hover:text-white">
										Register
									</a>
								</Link>
							</div>
						) : (
							<>
								<a className="block mt-4 mr-4 text-indigo-200 lg:inline-block lg:mt-0 hover:text-white">
									{user.name}
								</a>
								<button
									className="block mt-4 mr-4 text-indigo-200 lg:inline-block lg:mt-0 hover:text-white"
									onClick={logoutHandler}
								>
									Logout
								</button>
							</>
						)}
					</div>
				</nav>
			)}
		</>
	);
}
