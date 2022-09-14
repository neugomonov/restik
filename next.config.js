const withTranslate = require("next-translate");
const withOptimizedImages = require("next-optimized-images");
const withPWA = require("next-pwa");

const nextConfig = {
	reactStrictMode: true,
	pwa: {
		dest: "public",
		register: true,
		skipWaiting: true,
		disable: process.env.NODE_ENV === "development",
	},
	i18n: {
		locales: ["en", "ru"],
		defaultLocale: "ru",
	},
	env: {
		stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
	},
};

module.exports = withTranslate(withOptimizedImages(withPWA(nextConfig)));
