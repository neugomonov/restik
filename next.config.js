const withTranslate = require("next-translate");
const withOptimizedImages = require("next-optimized-images");
const withOffline = require("next-offline");

const nextConfig = {
	workboxOpts: {
		swDest: "static/service-worker.js",
		runtimeCaching: [
			{
				urlPattern: /^https?.*/,
				handler: "NetworkFirst",
				options: {
					cacheName: "https-calls",
					networkTimeoutSeconds: 15,
					expiration: {
						maxEntries: 150,
						maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
					},
					cacheableResponse: {
						statuses: [0, 200],
					},
				},
			},
		],
	},
	reactStrictMode: true,
	i18n: {
		locales: ["en", "ru"],
		defaultLocale: "ru",
	},
	env: {
		stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
	},
};

module.exports = withTranslate(withOptimizedImages(withOffline(nextConfig)));
