/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./App.tsx", "./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Manrope', 'sans-serif'],
				display: ['Space Grotesk', 'sans-serif'],
			},
			colors: {
				background: '#050505',
				surface: '#0F0F11',
				primary: '#A855F7',
				accent: '#2DD4BF',
				muted: '#9CA3AF',
			},
		},
	},
	plugins: [],
};
