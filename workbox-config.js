module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{jpg,png,webp,gif,svg,json,glb}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};