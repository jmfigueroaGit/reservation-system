import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '@/actions/eventAction';
import ButtonLoader from '../layout/ButtonLoader';
import { CheckCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';

export default function ManageEvent() {
	const [title, setTitle] = useState('');
	const [org, setOrg] = useState('');
	const [type, setType] = useState('');
	const [category, setCategory] = useState('');
	const [eventStart, setEventStart] = useState(new Date());
	const [eventEnd, setEventEnd] = useState(new Date());
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');

	const [venue, setVenue] = useState(false);
	const [onSite, setOnSite] = useState(false);
	const [location, setLocation] = useState('');
	const [online, setOnline] = useState(false);
	const [tba, setTba] = useState(false);
	const [finish, setFinish] = useState(false);

	const router = useRouter();
	const dispatch = useDispatch();

	const { loading, event, success, error } = useSelector(
		(state) => state.getEvent
	);

	useEffect(() => {
		if (!success) {
			dispatch(getEvent(router.query.id));
		}
		if (success && event) {
			setTitle(event.title);
			setOrg(event.organization);
			setType(event.type);
			setCategory(event.category);
			setOnline(event.location.online);
			setOnSite(event.location.venue.onSite);
			setTba(event.location.tba);
			setEventStart(
				new Date(event.dateTime.eventStart).toISOString().split('T')[0]
			);
			setEventEnd(
				new Date(event.dateTime.eventEnd).toISOString().split('T')[0]
			);
			setStartTime(event.dateTime.startTime);
			setEndTime(event.dateTime.endTime);
		}
	}, [loading, event, router, success, dispatch]);

	const venueHandler = (e) => {
		e.preventDefault();
		setOnSite(true);
		setVenue(true);
		setOnline(false);
		setTba(false);
	};
	const onlineHandler = (e) => {
		e.preventDefault();
		setOnline(true);
		setVenue(false);
		setTba(false);
	};

	const tbaHandler = (e) => {
		e.preventDefault();
		setTba(true);
		setOnline(false);
		setVenue(false);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		const eventData = {
			title,
			org,
			type,
			category,
			location: {
				venue: {
					onSite,
					location,
				},
				online,
				tba,
			},
			dateTime: {
				eventStart,
				eventEnd,
				startTime,
				endTime,
			},
		};
		if (
			type.length === 0 ||
			category.length === 0 ||
			title.length === 0 ||
			eventStart.length === 0 ||
			eventEnd.length === 0 ||
			startTime.length === 0 ||
			endTime.length === 0
		) {
			toast.error('Please fill up all fields');
		} else {
			dispatch(createEvent(eventData));
		}
	};
	return (
		<div className="flex flex-no-wrap h-full ">
			<div className="w-80 absolute sm:relative bg-[#2C325A] shadow flex-col justify-between hidden sm:flex  m-2 rounded-md">
				<div className="px-8">
					<ul className="mt-12">
						<li className="flex items-center justify-between w-full mb-6 text-indigo-400 cursor-pointer hover:text-indigo-400">
							<div className="flex items-center">
								{!finish ? (
									<h1 className="px-3 py-1 text-white bg-indigo-400 rounded-full">
										1
									</h1>
								) : (
									<CheckCircleIcon className="h-9" />
								)}
								<span className="ml-2 font-semibold text-md ">Basic Info</span>
							</div>
						</li>{' '}
						<Link href={'/manage/events/1/details'} passHref>
							<li className="flex items-center justify-between w-full mb-6 text-indigo-200 cursor-pointer hover:text-indigo-400">
								<div className="flex items-center">
									{!finish ? (
										<h1 className="bg-[#25294A] text-white py-1 px-3 rounded-full">
											2
										</h1>
									) : (
										<CheckCircleIcon className="h-9" />
									)}
									<span className="ml-2 font-semibold text-md">Details</span>
								</div>
							</li>
						</Link>
						<Link href={'/manage/events/1/online-event'} passHref>
							<li className="flex items-center justify-between w-full mb-6 text-indigo-200 cursor-pointer hover:text-indigo-400">
								<div className="flex items-center">
									{!finish ? (
										<h1 className="bg-[#25294A] text-white py-1 px-3 rounded-full">
											3
										</h1>
									) : (
										<CheckCircleIcon className="h-9" />
									)}
									<span className="ml-2 font-semibold text-md">
										Online Event Page
									</span>
								</div>
							</li>
						</Link>
						<Link href={'/manage/events/1/tickets'} passHref>
							<li className="flex items-center justify-between w-full mb-6 text-indigo-200 cursor-pointer hover:text-indigo-400">
								<div className="flex items-center">
									{!finish ? (
										<h1 className="bg-[#25294A] text-white py-1 px-3 rounded-full">
											4
										</h1>
									) : (
										<CheckCircleIcon className="h-9" />
									)}
									<span className="ml-2 font-semibold text-md">Tickets</span>
								</div>
							</li>
						</Link>
						<Link href={'/manage/events/1/preview-publish'} passHref>
							<li className="flex items-center justify-between w-full mb-6 text-indigo-200 cursor-pointer hover:text-indigo-400">
								<div className="flex items-center">
									{!finish ? (
										<h1 className="bg-[#25294A] text-white py-1 px-3 rounded-full">
											5
										</h1>
									) : (
										<CheckCircleIcon className="h-9" />
									)}
									<span className="ml-2 font-semibold text-md">Publish</span>
								</div>
							</li>
						</Link>
					</ul>
				</div>
			</div>
			{event && (
				<form className="w-screen " onSubmit={submitHandler}>
					<div className="container mx-auto w-4/5  bg-[#2C325A] m-10 rounded-lg drop-shadow-md">
						<div className="flex flex-row p-10 m-5 ">
							<div className="flex flex-col flex-none w-1/3 text-white">
								<h1 className="text-3xl font-bold ">Basic Info</h1>
								<p className="pt-2 pr-10 font-light text-justify">
									Name your event and tell event-goers why they should come. Add
									details that highlight what makes it unique.
								</p>
							</div>
							<div className="flex flex-col w-2/3 p-5 text-white">
								<h3 className="text-xl font-semibold">
									Event Title <span className="text-red-500">*</span>
								</h3>
								<input
									className="hover:bg-[#25294A] p-4 m-2 leading-tight text-gray-100 bg-[#2F3569] border-2 rounded-lg  border-transparent focus:border-transparent focus:ring-0 "
									id="eventTitle"
									type="text"
									placeholder="Be clear and descriptive."
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
								<h3 className="text-xl font-semibold">Organizer</h3>
								<input
									className="hover:bg-[#25294A] p-4 m-2 leading-tight text-gray-100 bg-[#2F3569] border-2 rounded-lg  border-transparent focus:border-transparent focus:ring-0 "
									id="organizer"
									type="text"
									placeholder="Tell attendees who is organizing this event."
									value={org}
									onChange={(e) => setOrg(e.target.value)}
								/>
								<div className="flex flex-row justify-between">
									<div className="flex flex-col w-2/4 ">
										<h3 className="text-xl font-semibold">
											Type <span className="text-red-500">*</span>
										</h3>
										<select
											id="type"
											name="type"
											className="hover:bg-[#25294A] p-4 m-2 leading-tight text-xl font-semibold text-gray-400 bg-[#2F3569] border-2 rounded-lg  border-transparent focus:border-transparent focus:ring-0"
											value={type}
											onChange={(e) => setType(e.target.value)}
										>
											<option value="volvo">Volvo</option>
											<option value="saab">Saab</option>
											<option value="fiat">Fiat</option>
											<option value="audi">Audi</option>
										</select>
									</div>
									<div className="flex flex-col w-2/4 ">
										<h3 className="text-xl font-semibold">
											Category <span className="text-red-500">*</span>
										</h3>
										<select
											id="category"
											name="category"
											className="hover:bg-[#25294A] p-4 m-2 leading-tight text-xl font-semibold text-gray-400 bg-[#2F3569] border-2 rounded-lg  border-transparent focus:border-transparent focus:ring-0"
											value={category}
											onChange={(e) => setCategory(e.target.value)}
										>
											<option value="volvo">Volvo</option>
											<option value="saab">Saab</option>
											<option value="fiat">Fiat</option>
											<option value="audi">Audi</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="container mx-auto w-4/5  bg-[#2C325A] m-10 rounded-lg drop-shadow-md">
						<div className="flex flex-row p-10 m-5 ">
							<div className="flex flex-col flex-none w-1/3 text-white">
								<h1 className="text-3xl font-bold ">Location</h1>
								<p className="pt-2 pr-10 font-light text-justify">
									Help people in the area discover your event and let attendees
									know where to show up.
								</p>
							</div>
							<div className="flex flex-col w-2/3 p-5 text-white">
								<div className="flex flex-row">
									<button
										className={
											event && event.location.venue.onSite
												? 'w-1/4 p-4 m-2  text-white  rounded-lg shadow bg-[#21b2b9] focus:bg-[#21b2b9] focus:shadow-outline focus:outline-none'
												: 'w-1/4 p-4 m-2  text-white bg-[#2F3569] rounded-lg shadow hover:bg-[#21b2b9] focus:bg-[#21b2b9] focus:shadow-outline focus:outline-none'
										}
										type="button"
										onClick={venueHandler}
									>
										Venue
									</button>
									<button
										className={
											event && event.location.online
												? 'w-1/4 p-4 m-2  text-white  rounded-lg shadow bg-[#21b2b9] focus:bg-[#21b2b9] focus:shadow-outline focus:outline-none'
												: 'w-1/4 p-4 m-2  text-white bg-[#2F3569] rounded-lg shadow hover:bg-[#21b2b9] focus:bg-[#21b2b9] focus:shadow-outline focus:outline-none'
										}
										type="button"
										onClick={onlineHandler}
									>
										Online
									</button>
									<button
										className={
											event && event.location.tba
												? 'w-1/4 p-4 m-2  text-white  rounded-lg shadow bg-[#21b2b9] focus:bg-[#21b2b9] focus:shadow-outline focus:outline-none'
												: 'w-1/4 p-4 m-2  text-white bg-[#2F3569] rounded-lg shadow hover:bg-[#21b2b9] focus:bg-[#21b2b9] focus:shadow-outline focus:outline-none'
										}
										type="button"
										onClick={tbaHandler}
									>
										To be announced
									</button>
								</div>

								{venue ? (
									<>
										<h3 className="text-xl font-semibold">
											Venue Location <span className="text-red-500">*</span>
										</h3>
										<input
											className="hover:bg-[#25294A] p-4 m-2 leading-tight text-gray-100 bg-[#2F3569] border-2 rounded-lg  border-transparent focus:border-transparent focus:ring-0 "
											id="email"
											type="text"
											placeholder="Tell attendees the address of the venue."
											value={location}
											onChange={(e) => setLocation(e.target.value)}
										/>
									</>
								) : online ? (
									<p className="pt-2 pr-10 m-5 font-light text-justify">
										Online events have unique event pages where you can add
										links to livestreams and more
									</p>
								) : tba ? (
									<></>
								) : (
									<></>
								)}
							</div>
						</div>
					</div>
					<div className="container mx-auto w-4/5  bg-[#2C325A] m-10 rounded-lg drop-shadow-md">
						<div className="flex flex-row p-10 m-5 ">
							<div className="flex flex-col flex-none w-1/3 text-white">
								<h1 className="text-3xl font-bold ">Date and time</h1>
								<p className="pt-2 pr-10 font-light text-justify">
									Tell event-goers when your event starts and ends so they can
									make plans to attend.
								</p>
							</div>
							<div className="flex flex-row w-4/5 p-5 text-white justify-evenly">
								<div className="flex flex-col ">
									<div className="w-4/5">
										<h3 className="text-xl font-semibold">
											Event Starts <span className="text-red-500">*</span>
										</h3>
										<input
											className="hover:bg-[#25294A] p-4 m-2 leading-tight text-gray-100 bg-[#2F3569] border-2 rounded-lg  border-transparent focus:border-transparent focus:ring-0 "
											id="email"
											type="date"
											placeholder="Be clear and descriptive."
											value={eventStart}
											onChange={(e) => setEventStart(e.target.value)}
										/>
									</div>
									<div className="w-4/5 ">
										<h3 className="text-xl font-semibold">
											Event Ends <span className="text-red-500">*</span>
										</h3>
										<input
											className="hover:bg-[#25294A] p-4 m-2 leading-tight text-gray-100 bg-[#2F3569] border-2 rounded-lg  border-transparent focus:border-transparent focus:ring-0 "
											id="email"
											type="date"
											placeholder="Be clear and descriptive."
											value={eventEnd}
											onChange={(e) => setEventEnd(e.target.value)}
										/>
									</div>
								</div>
								<div className="flex flex-col ">
									<div className="w-4/5">
										<h3 className="text-xl font-semibold">
											Start Time <span className="text-red-500">*</span>
										</h3>
										<input
											className=" hover:bg-[#25294A] p-4 m-2 leading-tight text-gray-100 bg-[#2F3569] border-2 rounded-lg  border-transparent focus:border-transparent focus:ring-0 "
											id="startTime"
											type="time"
											placeholder="Be clear and descriptive."
											value={startTime}
											onChange={(e) => setStartTime(e.target.value)}
										/>
									</div>
									<div className="w-4/5 ">
										<h3 className="text-xl font-semibold">
											End Time <span className="text-red-500">*</span>
										</h3>
										<input
											className="hover:bg-[#25294A] p-4 m-2 leading-tight text-gray-100 bg-[#2F3569] border-2 rounded-lg  border-transparent focus:border-transparent focus:ring-0 "
											id="endTime"
											type="time"
											placeholder="Be clear and descriptive."
											value={endTime}
											onChange={(e) => setEndTime(e.target.value)}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			)}
		</div>
	);
}
