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

export default function AddEvent() {
	const [finish, setFinish] = useState(false);
	const [image, setImage] = useState([]);
	const [imagePreview, setImagePreview] = useState('');
	const submitHandler = (e) => {
		e.preventDefault();
	};

	const handleChange = (e) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setImage(reader.result);
				setImagePreview(reader.result);
				console.log(imagePreview);
			}
		};

		reader.readAsDataURL(e.target.files[0]);
	};
	const deleteImage = (e) => {
		setImage([]);
		setImagePreview('');
	};
	return (
		<div className="flex flex-no-wrap h-full ">
			<div className="w-80   absolute sm:relative bg-[#2C325A] shadow flex-col justify-between hidden sm:flex  m-2 rounded-md">
				<div className="px-8">
					<ul className="mt-12">
						<Link href={'/manage/events/1/basicinfo'} passHref>
							<li className="flex w-full justify-between text-indigo-200 hover:text-indigo-400 cursor-pointer items-center mb-6">
								<div className="flex items-center">
									{!finish ? (
										<h1 className="bg-[#25294A] text-white py-1 px-3 rounded-full">
											1
										</h1>
									) : (
										<CheckCircleIcon className="h-9" />
									)}
									<span className="text-md ml-2 font-semibold">Basic Info</span>
								</div>
							</li>
						</Link>
						<li className="flex w-full justify-between text-indigo-400 hover:text-indigo-400 cursor-pointer items-center mb-6">
							<div className="flex items-center">
								{!finish ? (
									<h1 className="bg-indigo-400 text-white py-1 px-3 rounded-full">
										2
									</h1>
								) : (
									<CheckCircleIcon className="h-9" />
								)}
								<span className="text-md  ml-2 font-semibold">Details</span>
							</div>
						</li>
						<li className="flex w-full justify-between text-indigo-200 hover:text-indigo-400 cursor-pointer items-center mb-6">
							<div className="flex items-center">
								{!finish ? (
									<h1 className="bg-[#25294A] text-white py-1 px-3 rounded-full">
										3
									</h1>
								) : (
									<CheckCircleIcon className="h-9" />
								)}
								<span className="text-md  ml-2 font-semibold">
									Online Event Page
								</span>
							</div>
						</li>
						<li className="flex w-full justify-between text-indigo-200 hover:text-indigo-400 cursor-pointer items-center mb-6">
							<div className="flex items-center">
								{!finish ? (
									<h1 className="bg-[#25294A] text-white py-1 px-3 rounded-full">
										4
									</h1>
								) : (
									<CheckCircleIcon className="h-9" />
								)}
								<span className="text-md  ml-2 font-semibold">Tickets</span>
							</div>
						</li>
						<li className="flex w-full justify-between text-indigo-200 hover:text-indigo-400 cursor-pointer items-center mb-6">
							<div className="flex items-center">
								{!finish ? (
									<h1 className="bg-[#25294A] text-white py-1 px-3 rounded-full">
										5
									</h1>
								) : (
									<CheckCircleIcon className="h-9" />
								)}
								<span className="text-md  ml-2 font-semibold">Publish</span>
							</div>
						</li>
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
						<div className="rounded-lg shadow-xl w-4/5">
							<div className="m-4">
								<div className="flex items-center  justify-center w-full">
									{imagePreview && image ? (
										<>
											<label className="overflow-hidden h-56 justify-center w-full border-2  bg-cover hover:bg-[#25294A]  cursor-pointer ">
												<img
													src={imagePreview}
													className="h-56  w-screen opacity-80 "
													alt="image"
												/>
												<input
													type="file"
													className="opacity-0"
													onChange={handleChange}
												/>
											</label>
											<div
												className="absolute opacity-0 hover:opacity-100"
												onClick={deleteImage}
											>
												<div className=" flex flex-col justify-center bg-gray-100 px-4 py-2 rounded-full text-gray-900">
													<TrashIcon className="h-8 " />
													<span>Delete</span>
												</div>
											</div>
										</>
									) : (
										<label className="flex flex-col h-56 justify-center  w-full border-2  border-dashed hover:bg-[#25294A] hover:border-gray-300 cursor-pointer ">
											<div className="flex flex-col items-center  pt-7">
												<PhotographIcon className="h-12 text-gray-200" />
												<h1 className="pt-1 text-md font-semibold tracking-wider text-white ">
													Select a photo
												</h1>
												<p className="pt-1 text-sm tracking-wider font-thin text-gray-300 ">
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
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-900 bg-gray-200 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
