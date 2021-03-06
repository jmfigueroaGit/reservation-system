import React, { useEffect } from 'react';
import Link from 'next/link';
import Dropdown from './Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '@/actions/userAction';
import { signOut } from 'next-auth/react';
import LoadingScreen from './LoadingScreen';
import { TicketIcon, PlusIcon } from '@heroicons/react/outline';
export default function Header() {
	const dispatch = useDispatch();

	const { loading, user } = useSelector((state) => state.loadedUser);

	useEffect(() => {
		if (!user) dispatch(loadUser());
	}, [dispatch, user]);
	return (
		<>
			{loading ? (
				<></>
			) : (
				<header className=" top-0 flex flex-wrap items-center justify-between px-6 sticky-top bg-[#25294A] z-50">
					<div className="flex items-center flex-shrink-0 mr-6 text-white">
						<Link href="/" passHref>
							<h1 className="text-2xl font-bold tracking-widest cursor-pointer p-7">
								<span className="text-gray-100">DUBU</span>
								<span className="text-blue-500">PUD</span>
							</h1>
						</Link>
					</div>
					<div className="block w-full lg:flex lg:items-center lg:w-2/6">
						{!user ? (
							<div className="flex justify-end mr-20 text-lg lg:flex-grow">
								<Link href="/login" passHref>
									<a className="block mt-4 mr-4 text-indigo-200 lg:inline-block lg:mt-0 hover:text-white">
										Login
									</a>
								</Link>
								<Link href="/register" passHref>
									<a className="block mt-4 ml-10 text-indigo-200 lg:inline-block lg:mt-0 hover:text-white">
										Register
									</a>
								</Link>
							</div>
						) : (
							<div className="flex flex-row items-center justify-center text-lg max-h-max ">
								<Link href="/manage/events/create" passHref>
									<div className="cursor-pointer flex flex-col items-center justify-center h-full p-6 mr-2 text-indigo-400 hover:bg-[#2b2f53]">
										<PlusIcon className="h-7 " />
										<h3 className="text-sm font-semibold">Create an event</h3>
									</div>
								</Link>
								<div className="flex flex-col items-center justify-center h-full p-6 mr-2 text-indigo-200 hover:bg-[#2b2f53]">
									<TicketIcon className="h-7 " />
									<h3 className="text-sm font-semibold">Tickets</h3>
								</div>
								<div className="flex flex-row items-center justify-center h-full p-8 mr-2 text-indigo-200 hover:bg-[#2b2f53]">
									<img
										src={user.avatar.url}
										className="rounded-full w-14 "
										alt="image"
									/>
									<Dropdown name={user.name} />
								</div>
							</div>
						)}
					</div>
				</header>
			)}
		</>
	);
}
