export const EventCard = ({ event }) => {
	return (
		<div
			className="w-1/5 mx-10 mt-5 overflow-hidden rounded-t-sm shadow-md"
			key={event._id}
		>
			<div className="">
				<img className="w-sm" src="/images/empty.jpg" alt={event.title} />
				<div className="px-4 py-2">
					<h1 className="text-2xl font-bold text-gray-100">{event.title}</h1>
					<h3 className="text-lg font-semibold text-gray-500">
						{new Date(event.dateTime.eventStart).toDateString()} at{' '}
						{parseInt(event.dateTime.startTime) > 12
							? (parseInt(event.dateTime.startTime) % 12) + ' PM'
							: event.dateTime.startTime + ' AM'}
					</h3>
					<h5 className="text-lg text-green-500">
						{event.location.online ? 'Free' : 'TBA'}
					</h5>
					<div className="flex flex-row items-center pt-3">
						<img
							className="h-12 w-12 rounded-full  -top-6 p-0.5 border-2 right-6"
							src={event.user.avatar.url}
							alt={event.user.avatar.url}
						/>
						<h1 className="mx-2 text-xl font-semibold text-gray-100">
							{event.user.name}
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
};
