import info from "./info";

const { types } = info;
// TODO: these are not pizzas lol
const translatedIngredients = new Map([
	[
		"Courier",
		{
			en: "Отследи курьера в нашем приложении!",
			ru: "Отследи курьера в нашем приложении!",
		},
	],
	[
		"Year",
		{
			en: "Зимние предложения 2022 в пиццерии!",
			ru: "Зимние предложения 2022 в пиццерии!",
		},
	],
	[
		"Geo",
		{
			en: "Вы можете заказать доставку по геопозиции!",
			ru: "Вы можете заказать доставку по геопозиции! ",
		},
	],
	[
		"Pay",
		{
			en: "Как оплатить заказ в пиццерии?",
			ru: "Как оплатить заказ в пиццерии?",
		},
	],
	[
		"Lottery",
		{
			en: "Итоги большого новогоднего розыгрыша!",
			ru: "Итоги большого новогоднего розыгрыша!",
		},
	],
	[
		"Code",
		{
			en: "Пиццерия проводит IT CODE 2.0!",
			ru: "Пиццерия проводит IT CODE 2.0!",
		},
	],
	["Logo", { en: "Конкурс на  логотип", ru: "Конкурс на  логотип" }],
	["LotteryEnd", { en: "Итоги лотереи", ru: "Итоги лотереи" }],
	["Opened", { en: "Мы открылись! 🎉", ru: "Мы открылись! 🎉" }],

	[
		"ToBeContinued",
		{
			en: "Заказывайте домой, ешьте у нас, следите за нашими новостями, будет много интересного...",
			ru: "Заказывайте домой, ешьте у нас, следите за нашими новостями, будет много интересного...",
		},
	],
]);

const news = (lang: "en" | "ru") => [
	{
		name: (translatedIngredients.get("Courier") as { en: string; ru: string })[
			lang
		],
		image: "images/covers/news/live.jpg",
		ingredients: [
			(
				translatedIngredients.get("ToBeContinued") as { en: string; ru: string }
			)[lang],
		],
		variants: [
			{ type: types.small[lang], price: 280 },
			{ type: types.large[lang], price: 380 },
		],
		tastyFee: 0,
	},
	{
		name: (translatedIngredients.get("Pay") as { en: string; ru: string })[
			lang
		],
		image: "images/covers/news/howsway.jpg",
		ingredients: [
			(
				translatedIngredients.get("ToBeContinued") as { en: string; ru: string }
			)[lang],
		],
		variants: [
			{ type: types.small[lang], price: 200 },
			{ type: types.large[lang], price: 380 },
		],
		tastyFee: 0,
	},
	{
		name: (
			translatedIngredients.get("Lottery") as {
				en: string;
				ru: string;
			}
		)[lang],
		image: "images/covers/news/500.jpg",
		ingredients: [
			(
				translatedIngredients.get("ToBeContinued") as { en: string; ru: string }
			)[lang],
		],
		variants: [
			{ type: types.small[lang], price: 210 },
			{ type: types.large[lang], price: 390 },
		],
		tastyFee: 0,
	},
	{
		name: (translatedIngredients.get("Year") as { en: string; ru: string })[
			lang
		],
		image: "images/covers/news/newyear.jpg",
		ingredients: [
			(
				translatedIngredients.get("ToBeContinued") as { en: string; ru: string }
			)[lang],
		],
		variants: [
			{ type: types.small[lang], price: 120 },
			{ type: types.large[lang], price: 200 },
		],
		tastyFee: 0,
	},
	{
		name: (translatedIngredients.get("Code") as { en: string; ru: string })[
			lang
		],
		image: "images/covers/news/itcode.jpg",
		ingredients: [
			(
				translatedIngredients.get("ToBeContinued") as { en: string; ru: string }
			)[lang],
		],
		variants: [
			{ type: types.small[lang], price: 150 },
			{ type: types.large[lang], price: 270 },
		],
		tastyFee: 0,
	},
	{
		name: (translatedIngredients.get("Geo") as { en: string; ru: string })[
			lang
		],
		image: "images/covers/news/doyou.jpg",
		ingredients: [
			(
				translatedIngredients.get("ToBeContinued") as { en: string; ru: string }
			)[lang],
		],
		variants: [
			{ type: types.small[lang], price: 210 },
			{ type: types.large[lang], price: 390 },
		],
		tastyFee: 0,
	},
	{
		name: (translatedIngredients.get("Logo") as { en: string; ru: string })[
			lang
		],
		image: "images/covers/news/logo.jpg",
		ingredients: [
			(
				translatedIngredients.get("ToBeContinued") as { en: string; ru: string }
			)[lang],
		],
		variants: [
			{ type: types.small[lang], price: 60 },
			{ type: types.large[lang], price: 100 },
		],
		tastyFee: 0,
	},
	{
		name: (
			translatedIngredients.get("LotteryEnd") as {
				en: string;
				ru: string;
			}
		)[lang],
		image: "images/covers/news/10.jpg",
		ingredients: [
			(
				translatedIngredients.get("ToBeContinued") as { en: string; ru: string }
			)[lang],
		],
		variants: [
			{ type: types.small[lang], price: 70 },
			{ type: types.large[lang], price: 120 },
		],
		tastyFee: 0,
	},
	{
		name: (translatedIngredients.get("Opened") as { en: string; ru: string })[
			lang
		],
		image: "images/covers/news/openup.jpg",
		ingredients: [
			(
				translatedIngredients.get("ToBeContinued") as { en: string; ru: string }
			)[lang],
		],
		variants: [
			{ type: types.small[lang], price: 150 },
			{ type: types.large[lang], price: 250 },
		],
		tastyFee: 0,
	},
];

export default news;
