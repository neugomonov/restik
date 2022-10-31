import info from "./info";

const { types } = info;
const translatedIngredients = new Map([
	[
		"Courier",
		{
			en: "Track the courier in our application!",
			ru: "Отследи курьера в нашем приложении!",
		},
	],
	[
		"Year",
		{
			en: "Winter offers 2022 in Pizzeria!",
			ru: "Зимние предложения 2022 в Пиццерии!",
		},
	],
	[
		"Geo",
		{
			en: "You can order delivery by geolocation!",
			ru: "Вы можете заказать доставку по геопозиции! ",
		},
	],
	[
		"Pay",
		{
			en: "How to pay for an order at Pizzeria?",
			ru: "Как оплатить заказ в Пиццерии?",
		},
	],
	[
		"Lottery",
		{
			en: "Results of the big New Year's draw!",
			ru: "Итоги большого новогоднего розыгрыша!",
		},
	],
	[
		"Code",
		{
			en: "Pizzeria conducts IT CODE 2.0!",
			ru: "Пиццерия проводит IT CODE 2.0!",
		},
	],
	["Logo", { en: "Logo Contest", ru: "Конкурс на  логотип" }],
	["LotteryEnd", { en: "Lottery results", ru: "Итоги лотереи" }],
	["Opened", { en: "We have opened! 🎉", ru: "Мы открылись! 🎉" }],

	[
		"ToBeContinued",
		{
			en: "Order home, eat with us, follow our news, there will be a lot of interesting things...",
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
		date: "10.04.2022",
		variants: [
			{ type: types.small[lang], price: 280 },
			{ type: types.large[lang], price: 380 },
		],
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
		date: "08.04.2022",
		variants: [
			{ type: types.small[lang], price: 200 },
			{ type: types.large[lang], price: 380 },
		],
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
		date: "08.04.2022",
		variants: [
			{ type: types.small[lang], price: 210 },
			{ type: types.large[lang], price: 390 },
		],
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
		date: "07.04.2022",
		variants: [
			{ type: types.small[lang], price: 120 },
			{ type: types.large[lang], price: 200 },
		],
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
		date: "07.04.2022",
		variants: [
			{ type: types.small[lang], price: 150 },
			{ type: types.large[lang], price: 270 },
		],
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
		date: "05.04.2022",
		variants: [
			{ type: types.small[lang], price: 210 },
			{ type: types.large[lang], price: 390 },
		],
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
		date: "04.04.2022",
		variants: [
			{ type: types.small[lang], price: 60 },
			{ type: types.large[lang], price: 100 },
		],
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
		date: "03.04.2022",
		variants: [
			{ type: types.small[lang], price: 70 },
			{ type: types.large[lang], price: 120 },
		],
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
		date: "03.04.2022",
		variants: [
			{ type: types.small[lang], price: 150 },
			{ type: types.large[lang], price: 250 },
		],
	},
];

export default news;
