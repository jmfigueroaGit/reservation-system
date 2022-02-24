module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'hero-banner':
					"linear-gradient(to right bottom, rgba(45, 55, 72, 0.7), rgba(99, 179, 237, 0.2)), url('/images/banner.jpg')",
				'online-event': "url('/images/online-event.png')",
			},
		},
	},
	plugins: [],
};
