import React from 'react';
import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children, title = 'Dubupod App' }) {
	return (
		<div className="flex flex-col h-screen bg-[#25294A]">
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Header />
			<div className="flex-1">
				<ToastContainer position="botton-right" />
				{children}
			</div>
			<Footer />
		</div>
	);
}
