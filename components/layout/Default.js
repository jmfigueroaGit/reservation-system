import React from 'react';
import Head from 'next/head';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Default({ children, title = 'Dubupod App' }) {
	return (
		<div className="bg-[#25294A] h-screen w-screen">
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			{children}
			<ToastContainer position="bottom-right" />
		</div>
	);
}
