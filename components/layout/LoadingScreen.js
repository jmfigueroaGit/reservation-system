import React from 'react';
import ButtonLoader from './ButtonLoader';
export default function LoadingScreen() {
	return (
		<div className="flex flex-wrap items-center justify-center p-6 sticky-top bg-[#161724] h-screen absolute w-screen">
			<ButtonLoader />
		</div>
	);
}
