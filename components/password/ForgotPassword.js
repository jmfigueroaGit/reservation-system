import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ButtonLoader from '../layout/ButtonLoader';
import Default from '../layout/Default';
import { findUserEmail, clearErrors } from '@/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
export default function ForgotPassword() {
	const [email, setEmail] = useState('');
	const dispatch = useDispatch();
	const router = useRouter();

	const { loading, status, error } = useSelector((state) => state.findEmail);

	useEffect(() => {
		if (status) {
			router.push('/password/reset');
		}
		if (error) {
			toast.error(error);
		}
	}, [error, router, status]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (email.length === 0) {
			toast.error('Please fill the empty field');
			clearErrors();
		} else {
			dispatch(findUserEmail(email));
		}
	};
	return (
		<Default>
			<form
				className="flex flex-col items-center justify-center h-screen "
				onSubmit={submitHandler}
			>
				<div className="my-5">
					<h1 className="text-3xl font-bold text-white">Forgot Password</h1>
				</div>
				<input
					className="w-1/5 p-4 m-2 leading-tight text-gray-100 bg-[#2F3569] border-2 rounded-lg  border-transparent focus:border-transparent focus:ring-0 "
					id="email"
					type="text"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button
					className="w-1/5 p-4 m-2 font-bold text-white bg-[#24C4CD] rounded-lg shadow hover:bg-[#21b2b9] focus:shadow-outline focus:outline-none"
					type="submit"
					disabled={loading ? true : false}
				>
					{loading ? <ButtonLoader /> : 'Search'}
				</button>
				<div className="flex flex-col items-center">
					<h5 className="mx-1 text-white">
						Go back to{' '}
						<span className="text-[#24C4CD] underline">
							<Link href="/login">Sign In</Link>
						</span>
					</h5>
				</div>
			</form>
		</Default>
	);
}
