const withTranslate = require("next-translate");
const withOptimizedImages = require("next-optimized-images");
const withPWA = require("next-pwa")({ dest: "public" });
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
}); // I'm sowwy boondl⸻analoozeew 🥺🔫

const nextConfig = {
	reactStrictMode: true,
	pwa: {
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

module.exports = withPWA(withTranslate(withOptimizedImages(nextConfig)));
