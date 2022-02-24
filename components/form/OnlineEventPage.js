import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '@/actions/eventAction';
import Link from 'next/link';
import ButtonLoader from '../layout/ButtonLoader';
import {
	CheckCircleIcon,
	LinkIcon,
	PhotographIcon,
} from '@heroicons/react/solid';
import Image from 'next/image';

export default function OnlineEventPage() {
	const [finish, setFinish] = useState(false);
	const [image, setImage] = useState('');
	const [imagePreview, setImagePreview] = useState('');
	const submitHandler = (e) => {
		e.preventDefault();
	};

	const handleChange = (e) => {
		e.preventDefault();
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setImage(reader.result);
				setImagePreview(reader.result);
			}
		};

		reader.readAsDataURL(e.target.files[0]);
	};
	const deleteImage = (e) => {
		e.preventDefault();
		setImage('');
		setImagePreview('');
	};
	return (
		<div className="flex flex-no-wrap h-full ">
			<div className="w-80   absolute sm:relative bg-[#2C325A] shadow flex-col justify-between hidden sm:flex  m-2 rounded-md">
				<div className="px-8">
					<ul className="mt-12">
						<Link href={'/manage/events/1/basicinfo'} passHref>
							<li className="flex items-center justify-between w-full mb-6 text-indigo-200 cursor-pointer hover:text-indigo-400">
								<div className="flex items-center">
									{!finish ? (
										<h1 className="bg-[#25294A] text-white py-1 px-3 rounded-full">
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
										<h1 className="px-3 py-1 text-white  bg-[#25294A] rounded-full">
											2
										</h1>
									) : (
										<CheckCircleIcon className="h-9" />
									)}
									<span className="ml-2 font-semibold text-md">Details</span>
								</div>
							</li>
						</Link>
						<li className="flex items-center justify-between w-full mb-6 text-indigo-400 cursor-pointer hover:text-indigo-400">
							<div className="flex items-center">
								{!finish ? (
									<h1 className="px-3 py-1 text-white bg-indigo-400 rounded-full">
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

			<form className="w-screen " onSubmit={submitHandler}>
				<div className="container mx-auto w-4/5  bg-[#2C325A] m-10 rounded-lg drop-shadow-md">
					<div className="flex flex-row p-10 m-5 justify-evenly ">
						<div className="flex flex-col flex-none w-2/4 mt-5 text-white">
							<h1 className="text-3xl font-bold ">Attendee Event Page</h1>
							<p className="pt-2 pr-10 font-light text-justify">
								Attendees will join your online event through your virtual
								venue.Use this space to embed your Zoom video and share
								exclusive content. We`ll direct your ticket holders to this page
								from your event listing and in reminder emails.
							</p>
						</div>
						<Image
							src="/images/online-event.png"
							alt="Picture of the author"
							width={400}
							height={300}
						/>
					</div>
				</div>
				<div className="container mx-auto w-4/5  bg-[#2C325A] m-10 rounded-lg drop-shadow-md">
					<div className="flex flex-row p-10 m-5 ">
						<div className="flex flex-col flex-none w-1/3 text-white">
							<h1 className="flex flex-row items-center text-2xl font-bold">
								<span className="mr-2">
									<LinkIcon className="h-10 p-2 mx-1 rounded-full bg-[#25294A] " />
								</span>
								Add live video or audio
							</h1>
							<p className="pt-2 pr-10 font-light text-justify">
								Connect with Zoom to embed your event within your virtual venue,
								or link to another video or audio service.
							</p>
						</div>
						<div className="flex flex-col w-2/3 p-5 text-white">
							<div className="flex flex-col">
								<h3 className="mb-5 text-2xl font-semibold">
									Live Video or Audio
								</h3>
								<h3 className="font-semibold text-md">URL</h3>
								<input
									className="p-4 m-2 leading-tight text-gray-100 bg-[#2F3569] hover:bg-[#25294A] border-2 rounded-lg  border-transparent focus:border-transparent focus:ring-0 "
									id="eventTitle"
									type="text"
									placeholder="http://www.video-or-audio-provider.com"
									autoComplete="off"
								/>
								<h3 className="font-semibold text-md">Title</h3>
								<input
									className="p-4 m-2 leading-tight text-gray-100 bg-[#2F3569] hover:bg-[#25294A] border-2 rounded-lg  border-transparent focus:border-transparent focus:ring-0 "
									id="eventTitle"
									type="text"
									placeholder="Add a title to your live or audio"
									autoComplete="off"
								/>{' '}
								<label className="p-4 m-2  flex flex-col h-56 justify-center   bg-[#2F3569] hover:bg-[#25294A] rounded-lg cursor-pointer ">
									<div className="flex flex-col items-center pt-7">
										<PhotographIcon className="h-12 text-gray-200" />
										<h1 className="pt-1 font-semibold tracking-wider text-white text-md ">
											Drag & Drop or click to add a video preview (optional).
										</h1>
										<p className="pt-1 text-sm font-thin tracking-wider text-gray-300 ">
											Upload Image(jpg,png,svg,jpeg)
										</p>
									</div>
									<input
										type="file"
										className="opacity-0"
										onChange={handleChange}
									/>
								</label>
								<h3 className="font-semibold text-md">Description</h3>
								<textarea
									className="p-4 m-2 form-control hover:bg-[#25294A] block  px-3 py-1.5 text-base font-normal text-gray-900 bg-[#2F3569] bg-clip-padding  rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									id="exampleFormControlTextarea1"
									rows="4"
									placeholder="Add a description of further instructions here (optional)"
								></textarea>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
