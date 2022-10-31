import info from "./info";

const { types } = info;

const translatedIngredients = new Map([
	["Margherita", { en: "Margherita", ru: "Маргарита" }],
	["Capricciosa", { en: "Capricciosa", ru: "Капричоза" }],
	["Napoletana", { en: "Napoletana", ru: "Наполетана" }],
	["Calzone", { en: "Calzone", ru: "Кальцоне" }],
	["Quattro-Formaggi", { en: "Quattro-Formaggi", ru: "Четыре сыра" }],
	["Caprese", { en: "Caprese", ru: "Капрезе" }],
	["Tarhun", { en: "Tarhun", ru: "Тархун" }],
	["Pomegranate-juice", { en: "Pomegranate juice", ru: "Гранатовый сок" }],
	["Latte", { en: "Latte", ru: "Латте" }],

	["Cheese", { en: "Cheese", ru: "Сыр" }],
	["Mushrooms", { en: "Mushrooms", ru: "Грибы" }],
	["Ham", { en: "Ham", ru: "Ветчина" }],
	["Olives", { en: "Olives", ru: "Оливки" }],
	["Oregano", { en: "Oregano", ru: "Душица " }],
	["Pepper", { en: "Pepper", ru: "Перец" }],
	["Rice", { en: "Rice", ru: "Рис" }],
	["Saffron", { en: "Saffron", ru: "Шафран" }],
	["Turmeric", { en: "Turmeric", ru: "Куркума" }],
	["Chicken", { en: "Chicken", ru: "Курица" }],
]);

const menu = (lang: "en" | "ru") => [
	{
		name: (
			translatedIngredients.get("Margherita") as { en: string; ru: string }
		)[lang],
		image: "images/covers/margherita.webp",
		ingredients: [
			(translatedIngredients.get("Chicken") as { en: string; ru: string })[
				lang
			],
			(translatedIngredients.get("Oregano") as { en: string; ru: string })[
				lang
			],
		],
		variants: [
			{ type: types.small[lang], price: 280 },
			{ type: types.large[lang], price: 380 },
		],
	},
	{
		name: (
			translatedIngredients.get("Capricciosa") as { en: string; ru: string }
		)[lang],
		image: "images/covers/capricciosa.jpg",
		ingredients: [
			(translatedIngredients.get("Chicken") as { en: string; ru: string })[
				lang
			],
			(translatedIngredients.get("Pepper") as { en: string; ru: string })[lang],
			(translatedIngredients.get("Oregano") as { en: string; ru: string })[
				lang
			],
		],
		variants: [
			{ type: types.small[lang], price: 120 },
			{ type: types.large[lang], price: 200 },
		],
	},
	{
		name: (
			translatedIngredients.get("Napoletana") as { en: string; ru: string }
		)[lang],
		image: "images/covers/napoletana.jpg",
		ingredients: [
			(translatedIngredients.get("Rice") as { en: string; ru: string })[lang],
			(translatedIngredients.get("Saffron") as { en: string; ru: string })[
				lang
			],
			(translatedIngredients.get("Turmeric") as { en: string; ru: string })[
				lang
			],
			(translatedIngredients.get("Chicken") as { en: string; ru: string })[
				lang
			],
		],
		variants: [
			{ type: types.small[lang], price: 210 },
			{ type: types.large[lang], price: 390 },
		],
	},
	{
		name: (translatedIngredients.get("Calzone") as { en: string; ru: string })[
			lang
		],
		image: "images/covers/Calzone.jpg",
		ingredients: [
			(translatedIngredients.get("Chicken") as { en: string; ru: string })[
				lang
			],
			(translatedIngredients.get("Mushrooms") as { en: string; ru: string })[
				lang
			],
			(translatedIngredients.get("Ham") as { en: string; ru: string })[lang],
			(translatedIngredients.get("Olives") as { en: string; ru: string })[lang],
			(translatedIngredients.get("Cheese") as { en: string; ru: string })[lang],
		],
		variants: [
			{ type: types.small[lang], price: 200 },
			{ type: types.large[lang], price: 380 },
		],
	},
	{
		name: (
			translatedIngredients.get("Quattro-Formaggi") as {
				en: string;
				ru: string;
			}
		)[lang],
		image: "images/covers/Quattro-Formaggi.jpg",
		ingredients: [
			(translatedIngredients.get("Chicken") as { en: string; ru: string })[
				lang
			],
			(translatedIngredients.get("Mushrooms") as { en: string; ru: string })[
				lang
			],
			(translatedIngredients.get("Ham") as { en: string; ru: string })[lang],
			(translatedIngredients.get("Olives") as { en: string; ru: string })[lang],
		],
		variants: [
			{ type: types.small[lang], price: 210 },
			{ type: types.large[lang], price: 390 },
		],
	},
	{
		name: (translatedIngredients.get("Caprese") as { en: string; ru: string })[
			lang
		],
		image: "images/covers/caprese.jpg",
		ingredients: [
			(translatedIngredients.get("Chicken") as { en: string; ru: string })[
				lang
			],
			(translatedIngredients.get("Mushrooms") as { en: string; ru: string })[
				lang
			],
			(translatedIngredients.get("Ham") as { en: string; ru: string })[lang],
			(translatedIngredients.get("Olives") as { en: string; ru: string })[lang],
		],
		variants: [
			{ type: types.small[lang], price: 150 },
			{ type: types.large[lang], price: 270 },
		],
	},
	{
		name: (translatedIngredients.get("Tarhun") as { en: string; ru: string })[
			lang
		],
		image: "images/covers/tarhun.jpg",
		ingredients: [],
		variants: [
			{ type: types.small[lang], price: 60 },
			{ type: types.large[lang], price: 100 },
		],
	},
	{
		name: (
			translatedIngredients.get("Pomegranate-juice") as {
				en: string;
				ru: string;
			}
		)[lang],
		image: "images/covers/pomegranate-juice.jpg",
		ingredients: [],
		variants: [
			{ type: types.small[lang], price: 70 },
			{ type: types.large[lang], price: 120 },
		],
	},
	{
		name: (translatedIngredients.get("Latte") as { en: string; ru: string })[
			lang
		],
		image: "images/covers/Latte.jpg",
		ingredients: [],
		variants: [
			{ type: types.small[lang], price: 150 },
			{ type: types.large[lang], price: 250 },
		],
	},
];

export default menu;
