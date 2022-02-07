import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ButtonLoader from '../layout/ButtonLoader';
import Default from '../layout/Default';

import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearErrors } from '@/actions/userAction';
import Link from 'next/link';
export default function Register() {
	const dispatch = useDispatch();
	const router = useRouter();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { success, error, loading } = useSelector((state) => state.register);

	useEffect(() => {
		if (success) router.push('/login');
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, success, error, router]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (name.length === 0 && email.length === 0 && password.length === 0) {
			toast.error('Please fill the empty fields');
			dispatch(clearErrors());
		} else {
			const userData = {
				name,
				email,
				password,
			};
			dispatch(registerUser(userData));
		}
	};

	return (
		<Default>
			<form
				className="flex flex-col items-center justify-center h-screen "
				onSubmit={submitHandler}
			>
				<div className="my-5">
					<h1 className="text-3xl font-bold text-white">Create your account</h1>
				</div>

				<input
					className="w-1/5 p-4 m-2 leading-tight text-gray-100 bg-[#2F3569] border-2 rounded-lg  border-transparent focus:border-transparent focus:ring-0 "
					id="name"
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					className="w-1/5 p-4 m-2 leading-tight text-gray-100 bg-[#2F3569] border-2 rounded-lg  border-transparent focus:border-transparent focus:ring-0 "
					id="email"
					type="text"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					className=" w-1/5 p-4 m-2 leading-tight text-gray-100 bg-[#2F3569] border-2  rounded-lg border-transparent focus:border-transparent focus:ring-0"
					id="inline-password"
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<div className="w-1/5">
					<h1 className="font-semibold text-gray-300">Password must be : </h1>

					<ul className="text-sm font-light text-gray-400">
						<li> atleast 8 characters</li>
						<li>mixture of both uppercase and lowercase letters.</li>
					</ul>
				</div>

				<button
					className="w-1/5 p-4 m-2 font-bold text-white bg-[#24C4CD] rounded-lg shadow hover:bg-[#21b2b9] focus:shadow-outline focus:outline-none"
					type="submit"
					disabled={loading ? true : false}
				>
					{loading ? <ButtonLoader /> : 'Sign Up'}
				</button>
				<h5 className="mx-1 text-white">
					Already have an account?{' '}
					<span className="text-[#24C4CD] underline">
						<Link href="/login">Sign In</Link>
					</span>
				</h5>
			</form>
		</Default>
	);
}
