import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '@/actions/userAction';
import { userEvents } from '@/actions/eventAction';
import { PencilAltIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
export default function ManageEvent() {
	const router = useRouter();
	const dispatch = useDispatch();
	const { loading, user } = useSelector((state) => state.loadedUser);
	const {
		loading: eventsLoading,
		events,
		success,
	} = useSelector((state) => state.userEvents);

	useEffect(() => {
		if (!user) {
			dispatch(loadUser());
		}
		if (user && !success) {
			dispatch(userEvents(user._id));
		}
	}, [dispatch, user, success]);

	const handleEvent = (id) => {
		router.push(`/manage/events/${id}/basicinfo`);
	};
	return (
		<div className="p-12">
			<div className="flex flex-row justify-between p-5">
				<h1 className="text-3xl font-bold tracking-wider text-gray-100">
					Events
				</h1>
				<button
					className="p-4 m-2 font-bold text-white bg-[#24C4CD] rounded-lg shadow hover:bg-[#21b2b9] focus:shadow-outline focus:outline-none"
					type="submit"
				>
					Create Event
				</button>
			</div>
			<div className="flex flex-col w-4/5 ml-48 px-14">
				<ul
					role="list"
					className="divide-y divide-gray-200 dark:divide-gray-700"
				>
					{events && events.length === 0 ? (
						<div className="mt-5 alert alert-danger w-100">
							<b>No Events Found</b>
						</div>
					) : (
						events &&
						events.map((event) => (
							<li className="mt-2 py-5 px-5  bg-[#25294A]  " key={event.title}>
								<div className="flex items-center space-x-4">
									<div className="flex-shrink-0">
										<img
											className="w-16 "
											src="/images/empty.jpg"
											alt={event.title}
										/>
									</div>
									<div className="flex-1 min-w-0">
										<h1 className="font-medium text-gray-900 truncate text-md dark:text-white">
											{event.title}
										</h1>
										<p className="text-sm text-gray-500 truncate dark:text-gray-400">
											{new Date(event.dateTime.eventStart).toDateString()} at{' '}
											{parseInt(event.dateTime.startTime) > 12
												? (parseInt(event.dateTime.startTime) % 12) + ' PM'
												: event.dateTime.startTime + ' AM'}
										</p>
										<p className="inline-flex items-center text-base font-semibold text-green-500 ">
											{event.location.online ? 'Free' : 'TBA'}
										</p>
									</div>
									<button
										className="inline-flex items-center text-base text-white cursor-pointer hover:bg-[#1d203f] p-1 text-center rounded-md"
										onClick={() => handleEvent(event._id)}
									>
										<PencilAltIcon className="h-7" />
									</button>
								</div>
							</li>
						))
					)}
				</ul>
			</div>
		</div>
	);
}
