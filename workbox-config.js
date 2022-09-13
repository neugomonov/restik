module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{snap,tsx,ts,json,js,md,jpg,png,webp,gif,svg,glb,prisma,graphql,lock,log}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};