import React from 'react';
import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children, title = 'Dubupod App' }) {
	return (
		<div className="flex flex-col min-h-screen bg-[#2c3052]">
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Header />
			<main className="flex-grow">
				<ToastContainer position="bottom-right" />
				{children}
			</main>

			<Footer />
		</div>
	);
}
