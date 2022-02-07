import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import ButtonLoader from '../layout/ButtonLoader';
import Default from '../layout/Default';
import { toast } from 'react-toastify';
import { newPassword } from '@/actions/userAction';
import {
	FIND_EMAIL_RESET,
	FORGOT_PASSWORD_RESET,
} from '@/redux/constants/userConstant';
export default function NewPassword() {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const router = useRouter();
	const dispatch = useDispatch();

	const { loading, reset, error } = useSelector((state) => state.resetPassword);

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
		if (reset) {
			dispatch({ type: FIND_EMAIL_RESET });
			dispatch({ type: FORGOT_PASSWORD_RESET });
			router.push('/login');
		}
	}, [error, reset, router, dispatch]);
	const submitHandler = (e) => {
		e.preventDefault();
		if (password.length === 0 || confirmPassword.length === 0) {
			toast.error('Please fill empty fields');
		} else if (password !== confirmPassword) {
			toast.error('Password mismatched');
		} else if (password.length < 8 || confirmPassword.length < 8) {
			toast.error('Please enter password more than 8 characters');
		} else {
			dispatch(newPassword(router.query.token, password));
		}
	};
	return (
		<Default>
			<form
				className="flex flex-col items-center justify-center h-screen "
				onSubmit={submitHandler}
			>
				<div className="my-5">
					<h1 className="text-3xl font-bold text-white">New Password</h1>
				</div>

				<input
					className=" w-1/5 p-4 m-2 leading-tight text-gray-100 bg-[#2F3569] border-2  rounded-lg border-transparent focus:border-transparent focus:ring-0"
					id="inline-password"
					type="password"
					placeholder="New Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					className=" w-1/5 p-4 m-2 leading-tight text-gray-100 bg-[#2F3569] border-2  rounded-lg border-transparent focus:border-transparent focus:ring-0"
					id="confirm-password"
					type="password"
					placeholder="Confirm Password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<button
					className="w-1/5 p-4 m-2 font-bold text-white bg-[#24C4CD] rounded-lg shadow hover:bg-[#21b2b9] focus:shadow-outline focus:outline-none"
					type="submit"
					disabled={loading ? true : false}
				>
					{loading ? <ButtonLoader /> : 'Confirm'}
				</button>
			</form>
		</Default>
	);
}
