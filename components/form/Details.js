import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '@/actions/eventAction';
import Link from 'next/link';
import ButtonLoader from '../layout/ButtonLoader';
import {
	CheckCircleIcon,
	PhotographIcon,
	TrashIcon,
} from '@heroicons/react/solid';

export default function Details() {
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
						<li className="flex items-center justify-between w-full mb-6 text-indigo-400 cursor-pointer hover:text-indigo-400">
							<div className="flex items-center">
								{!finish ? (
									<h1 className="px-3 py-1 text-white bg-indigo-400 rounded-full">
										2
									</h1>
								) : (
									<CheckCircleIcon className="h-9" />
								)}
								<span className="ml-2 font-semibold text-md">Details</span>
							</div>
						</li>
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
						</Link>{' '}
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

			<form className="w-screen " onSubmit={submitHandler}>
				<div className="container mx-auto w-4/5  bg-[#2C325A] m-10 rounded-lg drop-shadow-md">
					<div className="flex flex-row p-10 m-5 ">
						<div className="flex flex-col flex-none w-1/3 text-white">
							<h1 className="text-3xl font-bold ">Main Event Image</h1>
							<p className="pt-2 pr-10 font-light text-justify">
								This is the first image attendees will see at the top of your
								listing. Use a high quality image: 2160x1080px (2:1 ratio).
							</p>
						</div>
						<div className="w-4/5 rounded-lg shadow-xl bg-[#2F3569] hover:bg-[#25294A]">
							<div className="m-4 ">
								<div className="flex items-center justify-center w-full ">
									{imagePreview && image ? (
										<>
											<label className="overflow-hidden h-56 justify-center w-full bg-cover hover:bg-[#25294A]  cursor-pointer ">
												<img
													src={imagePreview}
													className="w-screen h-56 opacity-80 "
													alt="image"
												/>
												<input
													type="file"
													className="opacity-0"
													onChange={handleChange}
												/>
											</label>
										</>
									) : (
										<label className="flex flex-col justify-center w-full h-56 cursor-pointer hover:border-gray-300 ">
											<div className="flex flex-col items-center pt-7">
												<PhotographIcon className="h-12 text-gray-200" />
												<h1 className="pt-1 font-semibold tracking-wider text-white text-md ">
													Select a photo
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
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container mx-auto w-4/5  bg-[#2C325A] m-10 rounded-lg drop-shadow-md">
					<div className="flex flex-row p-10 m-5 ">
						<div className="flex flex-col flex-none w-1/3 text-white">
							<h1 className="text-3xl font-bold ">Description</h1>
							<p className="pt-2 pr-10 font-light text-justify">
								Add more details to your event like your schedule, sponsors, or
								featured guests.
							</p>
						</div>
						<div className="flex flex-col w-2/3 p-5 text-white">
							<div className="flex flex-col">
								<h3 className="text-xl font-semibold">
									Event Title <span className="text-red-500">*</span>
								</h3>
								<textarea
									className="hover:bg-[#25294A] form-control block w-full px-3 py-1.5 text-base font-normal text-gray-100 bg-[#2F3569] bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-[#39407c] focus:border-blue-600 focus:outline-none"
									id="exampleFormControlTextarea1"
									rows="4"
									placeholder="Write a short event summary to get attendees excited."
								></textarea>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
