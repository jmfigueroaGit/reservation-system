import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '@/actions/eventAction';
import ButtonLoader from '../layout/ButtonLoader';
import {
	CheckCircleIcon,
	PhotographIcon,
	UserIcon,
} from '@heroicons/react/solid';
import { TicketIcon, ExternalLinkIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function Publish() {
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
						<Link href={'/manage/events/1/tickets'} passHref>
							<li className="flex items-center justify-between w-full mb-6 text-indigo-200 cursor-pointer hover:text-indigo-400">
								<div className="flex items-center">
									{!finish ? (
										<h1 className="px-3 bg-[#25294A] py-1 text-white  rounded-full">
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
							<li className="flex items-center justify-between w-full mb-6 text-indigo-400 cursor-pointer hover:text-indigo-400">
								<div className="flex items-center">
									{!finish ? (
										<h1 className="bg-indigo-400 text-white py-1 px-3 rounded-full">
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
				<div className="container mx-auto w-4/5  bg-[#2C325A] m-10 rounded-lg drop-shadow-md">
					<div className="flex flex-row p-10 m-5 ">
						<div className="flex flex-col flex-none w-1/3 text-white">
							<h1 className="text-3xl font-bold ">Publish Your Event</h1>
							<label className="flex flex-col justify-center w-full h-56 bg-gray-500 hover:border-gray-300 mt-10">
								<div className="flex flex-col items-center ">
									<PhotographIcon className="h-12 text-gray-200" />
								</div>
							</label>
						</div>
						<div className="flex flex-col w-2/3 p-5 text-white ">
							<h3 className="text-2xl font-semibold">Event Title</h3>
							<p className="text-sm font-light">
								Thursday, February 10, 2022 at 7:00 PM PST
							</p>
							<p className="text-sm font-light">Online Event</p>
							<div className="mt-2">
								<div className="flex flex-row w-48 justify-evenly items-center">
									<TicketIcon className="h-8 bg-gray-500 rounded-full p-1" />
									<p className="font-light">$0.00</p>
									<UserIcon className="h-8 bg-gray-500 rounded-full p-1" />
									<p className="font-light">100</p>
								</div>
								<p className="font-light mt-2 border-b py-5 px-2">
									With Gilas Pilipinas absorbing a blowout loss to New Zealand
									in the 2023 FIBA World Cup Asian qualifiers, a disappointed
									crowd at the Smart Araneta Coliseum let the national team
									officials know how they feel.
								</p>
								<button className="flex flex-row justify-center items-center m-2 mt-3 text-blue-500 font-semibold hover:bg-blue-500 hover:text-blue-100 rounded-lg p-2 px-8">
									Preview
									<ExternalLinkIcon className="h-6 ml-2" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
