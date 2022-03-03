import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '@/actions/userAction';
import { getEvents } from '@/actions/eventAction';
import LoadingScreen from './layout/LoadingScreen';
import { EventCard } from './card/EventCard';
export default function Home() {
	const dispatch = useDispatch();
	const { loading, user } = useSelector((state) => state.loadedUser);
	const {
		loading: eventLoading,
		events,
		success,
	} = useSelector((state) => state.getEvents);
	useEffect(() => {
		if (!success) {
			dispatch(getEvents());
		}
		if (!user) {
			dispatch(loadUser());
		}
	}, [dispatch, user, success]);
	return (
		<>
			{loading && eventLoading ? (
				<LoadingScreen />
			) : (
				<>
					<div className="flex items-center justify-start px-10 py-16 bg-center bg-cover bg-hero-banner">
						<div className="flex flex-col justify-between pl-10">
							<h1 className="w-4/5 font-bold text-left text-gray-300 uppercase text-7xl">
								Now is your time
							</h1>
							<button
								className="w-2/5 p-4 m-2 mt-5 font-bold text-white bg-indigo-900 rounded-lg shadow hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
								type="submit"
							>
								Find Event
							</button>
						</div>
					</div>
					<div className="p-5 ">
						<h5 className="text-xl font-bold text-gray-100 ">Popular Events</h5>
						<div className="flex flex-wrap justify-start mt-5">
							{events && events.length === 0 ? (
								<div className="mt-5 alert alert-danger w-100">
									<b>No Events Found</b>
								</div>
							) : (
								events &&
								events.map((event) => (
									<EventCard key={event._id} event={event} />
								))
							)}
						</div>
					</div>
				</>
			)}
		</>
	);
}
