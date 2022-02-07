import React from 'react';

export default function Footer() {
	return (
		<footer className="left-0 right-0 w-full py-3 mb-0 bg-[#25294A] ">
			<div className="flex flex-col items-center justify-center ">
				<h1 className="text-2xl font-bold tracking-widest">
					<span className="text-gray-100">DUBU</span>
					<span className="text-blue-500">PUD</span>
				</h1>
				<p className="text-gray-400">
					&#169; 2022 Dubupod, Inc. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
