import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '@/actions/userAction';
import LoadingScreen from './layout/LoadingScreen';
export default function Home() {
	const dispatch = useDispatch();
	const { loading, user } = useSelector((state) => state.loadedUser);

	useEffect(() => {
		if (!user) dispatch(loadUser());
	}, [dispatch, user]);
	return (
		<>
			{loading ? (
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
							<div className="w-1/5 mx-10 mt-5 overflow-hidden rounded-t-sm shadow-md">
								<div className="">
									<img
										className="w-sm"
										src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
										alt=""
									/>
									<div className="px-4 py-2">
										<h1 className="text-2xl font-bold text-gray-100">
											Frontend Bootcamp
										</h1>
										<h3 className="text-lg font-semibold text-gray-500">
											Tomorrow at 7:30 AM{' '}
										</h3>
										<h5 className="text-lg text-green-500">Free</h5>
										<div className="flex flex-row items-center pt-3">
											<img
												className="h-12 w-12 rounded-full  -top-6 p-0.5 border-2 right-6"
												src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
												alt=""
											/>
											<h1 className="mx-2 text-xl font-semibold text-gray-100">
												John Doe
											</h1>
										</div>
									</div>
								</div>
							</div>

							<div className="w-1/5 mx-10 mt-5 overflow-hidden rounded-t-sm shadow-md">
								<div className="">
									<img
										className="w-sm"
										src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
										alt=""
									/>
									<div className="px-4 py-2">
										<h1 className="text-2xl font-bold text-gray-100">
											Frontend Bootcamp
										</h1>
										<h3 className="text-lg font-semibold text-gray-500">
											Tomorrow at 7:30 AM{' '}
										</h3>
										<h5 className="text-lg text-green-500">Free</h5>
										<div className="flex flex-row items-center pt-3">
											<img
												className="h-12 w-12 rounded-full  -top-6 p-0.5 border-2 right-6"
												src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
												alt=""
											/>
											<h1 className="mx-2 text-xl font-semibold text-gray-100">
												John Doe
											</h1>
										</div>
									</div>
								</div>
							</div>

							<div className="w-1/5 mx-10 mt-5 overflow-hidden rounded-t-sm shadow-md">
								<div className="">
									<img
										className="w-sm"
										src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
										alt=""
									/>
									<div className="px-4 py-2">
										<h1 className="text-2xl font-bold text-gray-100">
											Frontend Bootcamp
										</h1>
										<h3 className="text-lg font-semibold text-gray-500">
											Tomorrow at 7:30 AM{' '}
										</h3>
										<h5 className="text-lg text-green-500">Free</h5>
										<div className="flex flex-row items-center pt-3">
											<img
												className="h-12 w-12 rounded-full  -top-6 p-0.5 border-2 right-6"
												src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
												alt=""
											/>
											<h1 className="mx-2 text-xl font-semibold text-gray-100">
												John Doe
											</h1>
										</div>
									</div>
								</div>
							</div>

							<div className="w-1/5 mx-10 mt-5 overflow-hidden rounded-t-sm shadow-md">
								<div className="">
									<img
										className="w-sm"
										src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
										alt=""
									/>
									<div className="px-4 py-2">
										<h1 className="text-2xl font-bold text-gray-100">
											Frontend Bootcamp
										</h1>
										<h3 className="text-lg font-semibold text-gray-500">
											Tomorrow at 7:30 AM{' '}
										</h3>
										<h5 className="text-lg text-green-500">Free</h5>
										<div className="flex flex-row items-center pt-3">
											<img
												className="h-12 w-12 rounded-full  -top-6 p-0.5 border-2 right-6"
												src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
												alt=""
											/>
											<h1 className="mx-2 text-xl font-semibold text-gray-100">
												John Doe
											</h1>
										</div>
									</div>
								</div>
							</div>

							<div className="w-1/5 mx-10 mt-5 overflow-hidden rounded-t-sm shadow-md">
								<div className="">
									<img
										className="w-sm"
										src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
										alt=""
									/>
									<div className="px-4 py-2">
										<h1 className="text-2xl font-bold text-gray-100">
											Frontend Bootcamp
										</h1>
										<h3 className="text-lg font-semibold text-gray-500">
											Tomorrow at 7:30 AM{' '}
										</h3>
										<h5 className="text-lg text-green-500">Free</h5>
										<div className="flex flex-row items-center pt-3">
											<img
												className="h-12 w-12 rounded-full  -top-6 p-0.5 border-2 right-6"
												src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
												alt=""
											/>
											<h1 className="mx-2 text-xl font-semibold text-gray-100">
												John Doe
											</h1>
										</div>
									</div>
								</div>
							</div>
							<div className="w-1/5 mx-10 mt-5 overflow-hidden rounded-t-sm shadow-md">
								<div className="">
									<img
										className="w-sm"
										src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
										alt=""
									/>
									<div className="px-4 py-2">
										<h1 className="text-2xl font-bold text-gray-100">
											Frontend Bootcamp
										</h1>
										<h3 className="text-lg font-semibold text-gray-500">
											Tomorrow at 7:30 AM{' '}
										</h3>
										<h5 className="text-lg text-green-500">Free</h5>
										<div className="flex flex-row items-center pt-3">
											<img
												className="h-12 w-12 rounded-full  -top-6 p-0.5 border-2 right-6"
												src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
												alt=""
											/>
											<h1 className="mx-2 text-xl font-semibold text-gray-100">
												John Doe
											</h1>
										</div>
									</div>
								</div>
							</div>

							<div className="w-1/5 mx-10 mt-5 overflow-hidden rounded-t-sm shadow-md">
								<div className="">
									<img
										className="w-sm"
										src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
										alt=""
									/>
									<div className="px-4 py-2">
										<h1 className="text-2xl font-bold text-gray-100">
											Frontend Bootcamp
										</h1>
										<h3 className="text-lg font-semibold text-gray-500">
											Tomorrow at 7:30 AM{' '}
										</h3>
										<h5 className="text-lg text-green-500">Free</h5>
										<div className="flex flex-row items-center pt-3">
											<img
												className="h-12 w-12 rounded-full  -top-6 p-0.5 border-2 right-6"
												src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
												alt=""
											/>
											<h1 className="mx-2 text-xl font-semibold text-gray-100">
												John Doe
											</h1>
										</div>
									</div>
								</div>
							</div>

							<div className="w-1/5 mx-10 mt-5 overflow-hidden rounded-t-sm shadow-md">
								<div className="">
									<img
										className="w-sm"
										src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
										alt=""
									/>
									<div className="px-4 py-2">
										<h1 className="text-2xl font-bold text-gray-100">
											Frontend Bootcamp
										</h1>
										<h3 className="text-lg font-semibold text-gray-500">
											Tomorrow at 7:30 AM{' '}
										</h3>
										<h5 className="text-lg text-green-500">Free</h5>
										<div className="flex flex-row items-center pt-3">
											<img
												className="h-12 w-12 rounded-full  -top-6 p-0.5 border-2 right-6"
												src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
												alt=""
											/>
											<h1 className="mx-2 text-xl font-semibold text-gray-100">
												John Doe
											</h1>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
