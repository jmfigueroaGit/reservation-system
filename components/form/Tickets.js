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
	const [showModal, setShowModal] = useState(false);

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
						</li>{' '}
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
						onClick={() => setShowModal(true)}
					>
						Create a ticket
					</button>
					{showModal ? (
						<div className="flex justify-center items-center ">
							<div aria-hidden="true" className="fixed z-50 w-3/5 mb-[27rem] ">
								<div className="relative bg-white rounded-lg shadow dark:bg-[#2C325A]">
									<div className="flex justify-end p-2">
										<button
											type="button"
											className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
											onClick={() => setShowModal(false)}
										>
											<svg
												className="w-5 h-5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
													clipRule="evenodd"
												></path>
											</svg>
										</button>
									</div>
									<div className="flex flex-col ml-44 mx-auto w-full  m-10 rounded-lg drop-shadow-md">
										<div className="flex flex-row p-10 m-5 ">
											<div className="flex flex-col w-2/3 p-5 text-white">
												{' '}
												<h1 className="text-3xl font-bold text-left">
													Add tickets
												</h1>
												<div className="flex flex-row">
													<button
														className="w-1/4 p-4 m-2  text-white bg-[#2F3569] rounded-lg shadow hover:bg-[#21b2b9] focus:bg-[#21b2b9] focus:shadow-outline focus:outline-none"
														type="button"
													>
														Paid
													</button>
													<button
														className="w-1/4 p-4 m-2  text-white bg-[#2F3569] rounded-lg shadow hover:bg-[#21b2b9] focus:bg-[#21b2b9] focus:shadow-outline focus:outline-none"
														type="button"
													>
														Free
													</button>
													<button
														className="w-1/4 p-4 m-2  text-white bg-[#2F3569] rounded-lg shadow hover:bg-[#21b2b9] focus:bg-[#21b2b9] focus:shadow-outline focus:outline-none"
														type="button"
													>
														Donation
													</button>
												</div>
												<h3 className="text-xl font-semibold text-left">
													Name
												</h3>
												<input
													className="hover:bg-[#25294A] p-4 m-2 leading-tight text-gray-100 bg-[#2F3569] border-2 rounded-lg  border-transparent focus:border-transparent focus:ring-0 "
													type="text"
													placeholder="Ticket name"
													autoComplete="false"
												/>
												<h3 className="text-xl font-semibold text-left">
													Available quantity
												</h3>
												<input
													className=" hover:bg-[#25294A] p-4 m-2 leading-tight text-gray-100 bg-[#2F3569] border-2 rounded-lg  border-transparent focus:border-transparent focus:ring-0 "
													type="number"
													placeholder="Ticket quantity"
													autoComplete="false"
												/>
												<h3 className="text-xl font-semibold text-left">
													Price
												</h3>
												<input
													className="hover:bg-[#25294A] p-4 m-2 leading-tight text-gray-100 bg-[#2F3569] border-2 rounded-lg  border-transparent focus:border-transparent focus:ring-0 "
													type="number"
													placeholder="$ 0.00"
													autoComplete="false"
												/>
												<div className="flex flex-row w-4/5 text-white justify-start text-left">
													<div className="flex flex-col ">
														<div className="w-4/5">
															<h3 className="text-xl font-semibold">
																Sales Start
																<span className="text-red-500">*</span>
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
																Sales End
																<span className="text-red-500">*</span>
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
													<div className="flex flex-col ml-5">
														<div className="w-4/5">
															<h3 className="text-xl font-semibold">
																Start Time{' '}
																<span className="text-red-500">*</span>
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
									</div>
								</div>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
