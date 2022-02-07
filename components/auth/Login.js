import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Default from '../layout/Default';
import ButtonLoader from '../layout/ButtonLoader';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from 'next-auth/react';

import { toast } from 'react-toastify';
import { RESET_PASSWORD_RESET } from '@/redux/constants/userConstant';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const { reset, error } = useSelector((state) => state.resetPassword);

	useEffect(() => {
		if (reset) {
			toast.success(reset.message);
			dispatch({ type: RESET_PASSWORD_RESET });
		}
	}, [dispatch, reset]);

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		const result = await signIn('credentials', {
			redirect: false,
			email,
			password,
		});
		setLoading(false);

		if (result.error) {
			toast.error(result.error);
		} else {
			window.location.href = '/';
		}
	};
	return (
		<Default>
			<form
				className="flex flex-col items-center justify-center h-screen "
				onSubmit={submitHandler}
			>
				<div className="my-5">
					<h1 className="text-3xl font-bold text-white">Login in to Dubupod</h1>
				</div>
				<input
					className="w-1/5 p-4 m-2 leading-tight text-gray-100 bg-[#2F3569] border-2 rounded-lg  border-transparent focus:border-transparent focus:ring-0 "
					id="inline-email"
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
				<button
					className="w-1/5 p-4 m-2 font-bold text-white bg-[#24C4CD] rounded-lg shadow hover:bg-[#21b2b9] focus:shadow-outline focus:outline-none"
					type="submit"
					disabled={loading ? true : false}
				>
					{loading ? <ButtonLoader /> : 'Sign In'}
				</button>
				<div className="flex flex-col items-center">
					<h5 className="text-[#24C4CD]  mx-1 underline">
						<Link href="/password/forgot">Forgot Password</Link>
					</h5>

					<h5 className="mx-1 text-white">
						{`Don't`} have an account?{' '}
						<span className="text-[#24C4CD] underline">
							<Link href="/register">Sign Up</Link>
						</span>
					</h5>
				</div>
			</form>
		</Default>
	);
}
