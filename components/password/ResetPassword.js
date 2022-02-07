import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserCircleIcon } from '@heroicons/react/solid';
import Default from '../layout/Default';
import ButtonLoader from '../layout/ButtonLoader';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
	FIND_EMAIL_RESET,
	FORGOT_PASSWORD_RESET,
} from '@/redux/constants/userConstant';
import { clearErrors, sendPasswordLink } from '@/actions/userAction';
export default function ForgotPassword() {
	const dispatch = useDispatch();
	const router = useRouter();

	const { status } = useSelector((state) => state.findEmail);
	const { loading, sent, error } = useSelector((state) => state.forgotPassword);

	useEffect(() => {
		if (!status) {
			router.push('/password/forgot');
		}
		if (error) {
			toast.error(error);
		}
		if (sent && !loading) {
			toast.success(sent.message);
			clearErrors();
		}
	}, [status, router, error, sent, loading]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(sendPasswordLink(status.email));
	};
	const cancelHandler = (e) => {
		e.preventDefault();
		dispatch({ type: FIND_EMAIL_RESET });
		router.push('/password/forgot');
	};

	const goBackHandler = (e) => {
		e.preventDefault();
		dispatch({ type: FIND_EMAIL_RESET });
		dispatch({ type: FORGOT_PASSWORD_RESET });
	};
	if (!sent) {
		return (
			<Default>
				{status && (
					<div className="flex flex-col items-center justify-center h-screen ">
						<div className="my-5">
							<h1 className="text-3xl font-bold text-white">
								Reset your password
							</h1>
						</div>

						<div className="flex flex-row items-center w-1/5 m-5 text-white justify-evenly">
							<div className="mx-5">
								<h1>Send me link via email</h1>
								<h3>{status.email}</h3>
							</div>
							<div className="flex flex-col items-center mx-5">
								<UserCircleIcon className="h-20" />
								<h1>{status.email}</h1>
							</div>
						</div>
						<div className="flex flex-row items-center justify-between w-1/5">
							<button
								className="w-2/5 p-4 m-2 font-bold text-gray-500 bg-gray-200 rounded-lg shadow hover:bg-gray-400 hover:text-gray-100 focus:shadow-outline focus:outline-none"
								type="button"
								onClick={cancelHandler}
							>
								Not you?
							</button>
							<button
								className="w-2/5 p-4 m-2 font-bold text-white bg-[#24C4CD] rounded-lg shadow hover:bg-[#21b2b9] focus:shadow-outline focus:outline-none"
								type="button"
								onClick={submitHandler}
								disabled={loading ? true : false}
							>
								{loading ? <ButtonLoader /> : 'Continue'}
							</button>
						</div>
					</div>
				)}
			</Default>
		);
	} else {
		return (
			<Default>
				{status && (
					<div className="flex flex-col items-center justify-center h-screen ">
						<div className="my-5">
							<h1 className="text-3xl font-bold text-white">
								Check your Email
							</h1>
						</div>

						<div className="flex flex-row items-center justify-center w-1/5 m-5 text-white">
							<h3 className="mx-3 text-lg">
								Check your email. Password Recovery link will expire after 30
								minutes
							</h3>
						</div>
						<button
							className="w-1/5 p-4 m-2 font-bold text-white bg-[#24C4CD] rounded-lg shadow hover:bg-[#21b2b9] focus:shadow-outline focus:outline-none"
							type="button"
							onClick={goBackHandler}
						>
							Go back
						</button>
					</div>
				)}
			</Default>
		);
	}
}
