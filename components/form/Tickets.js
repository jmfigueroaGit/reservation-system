import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '@/actions/eventAction';
import ButtonLoader from '../layout/ButtonLoader';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { TicketIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function Tickets() {
	const [title, setTitle] = useState('');
	const [org, setOrg] = useState('');
	const [type, setType] = useState('');
	const [category, setCategory] = useState('');
	const [eventStart, setEventStart] = useState('');
	const [eventEnd, setEventEnd] = useState('');
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

	const { loading, event, error } = useSelector((state) => state.createEvent);

	useEffect(() => {
		if (event) {
			router.push('/');
		}
		if (error) {
			toast.error(error);
		}
	}, [error, router, event]);

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
		<div className="flex flex-no-wrap h-screen">
			<div className="w-80  absolute sm:relative bg-[#2C325A] shadow flex-col justify-between hidden sm:flex  m-2 rounded-md">
				<div className="px-8">
					<ul className="mt-12">
						<Link href={'/manage/events/1/basicinfo'} passHref>
							<li className="flex items-center justify-between w-full mb-6 text-indigo-200 cursor-pointer hover:text-indigo-400">
								<div className="flex items-center">
									{!finish ? (
										<h1 className="px-3 py-1 text-white bg-[#25294A]  rounded-full">
											1
										</h1>
									) : (
										<CheckCircleIcon className="h-9" />
									)}
									<span className="ml-2 font-semibold text-md">Basic Info</span>
								</div>
							</li>
						</Link>
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
						<li className="flex items-center justify-between w-full mb-6 text-indigo-400 cursor-pointer hover:text-indigo-400">
							<div className="flex items-center">
								{!finish ? (
									<h1 className="px-3 py-1 text-white bg-indigo-400 rounded-full">
										4
									</h1>
								) : (
									<CheckCircleIcon className="h-9" />
								)}
								<span className="ml-2 font-semibold text-md">Tickets</span>
							</div>
						</li>
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
					</ul>
				</div>
			</div>

			<div className="flex items-center justify-center flex-grow w-screen text-gray-100">
				<div className="flex flex-col items-center text-center w-96">
					<TicketIcon className="h-20 p-3 text-gray-600 bg-gray-300 rounded-full" />
					<h1 className="text-2xl font-bold ">Let`s create tickets</h1>
					<p className="text-gray-300">
						Create an event to sell tickets using Eventbrite. To get started,
						click “Create event” and enter your event details.
					</p>
					<button
						className=" p-4 m-2 font-bold text-white bg-[#24C4CD] rounded-lg shadow hover:bg-[#21b2b9] focus:shadow-outline focus:outline-none"
						type="submit"
					>
						Create a ticket
					</button>
				</div>
			</div>
		</div>
	);
}
