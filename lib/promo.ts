import info from "./info";

const { types } = info;
const translatedIngredients = new Map([
	[
		"OPENUP",
		{
			en: "Пицца в подарок для всей компании!",
			ru: "Пицца в подарок для всей компании!",
		},
	],
	[
		"PIZZA1999",
		{
			en: "Приходите за выгодой в пиццерию!",
			ru: "Приходите за выгодой в пиццерию!",
		},
	],
	[
		"Prize",
		{ en: "Дарим пиццу за первый заказ!", ru: "Дарим пиццу за первый заказ! " },
	],
	["Souvenir", { en: "Сувенир в подарок!", ru: "Сувенир в подарок!" }],
	["Invite", { en: "Пригласите друга!", ru: "Пригласите друга!" }],
	[
		"Birthday",
		{ en: "Пицца на день рождения!", ru: "Пицца на день рождения!" },
	],
	[
		"FirstOrder",
		{ en: "2 пиццы за первый заказ!", ru: "2 пиццы за первый заказ!" },
	],
	["FIRST1", { en: "Скидка 30% в пиццерии!", ru: "Скидка 30% в пиццерии!" }],
	[
		"MakeSet",
		{ en: "Закажите сет всего за 795 ₽", ru: "Закажите сет всего за 795 ₽" },
	],

	[
		"1999",
		{
			en: "За заказ от 1999 рублей скидка 400 ₽ по промокоду PIZZA1999! 🍕",
			ru: "За заказ от 1999 рублей скидка 400 ₽ по промокоду PIZZA1999! 🍕",
		},
	],
	[
		"30",
		{
			en: "За первый заказ скидка 30% по промокоду FIRST1! 1️⃣",
			ru: "За первый заказ скидка 30% по промокоду FIRST1! 1️⃣",
		},
	],
	[
		"10",
		{
			en: "Мы открылись! 🥳 Скидка 10% на всё с промокодом OPENUP!",
			ru: "Мы открылись! 🥳 Скидка 10% на всё с промокодом OPENUP!",
		},
	],
	[
		"Tasty",
		{
			en: "За заказ доставки от 999 рублей дарим вкусные подарки!",
			ru: "За заказ доставки от 999 рублей дарим вкусные подарки!",
		},
	],
]);

const promo = (lang: "en" | "ru") => [
	{
		name: (translatedIngredients.get("OPENUP") as { en: string; ru: string })[
			lang
		],
		image: "images/covers/promo/pizza-gift.jpg",
		ingredients: [
			(translatedIngredients.get("10") as { en: string; ru: string })[lang],
		],
		date: "10.04.2022",
		variants: [
			{ type: types.small[lang], price: 280 },
			{ type: types.large[lang], price: 380 },
		],
		tastyFee: 0,
	},
	{
		name: (
			translatedIngredients.get("PIZZA1999") as { en: string; ru: string }
		)[lang],
		image: "images/covers/promo/pizza399.jpg",
		ingredients: [
			(translatedIngredients.get("1999") as { en: string; ru: string })[lang],
		],
		date: "08.04.2022",
		variants: [
			{ type: types.small[lang], price: 120 },
			{ type: types.large[lang], price: 200 },
		],
		tastyFee: 0,
	},
	{
		name: (translatedIngredients.get("Prize") as { en: string; ru: string })[
			lang
		],
		image: "images/covers/promo/pizza-gift2.jpg",
		ingredients: [
			(translatedIngredients.get("Tasty") as { en: string; ru: string })[lang],
		],
		date: "08.04.2022",
		variants: [
			{ type: types.small[lang], price: 210 },
			{ type: types.large[lang], price: 390 },
		],
		tastyFee: 0,
	},
	{
		name: (translatedIngredients.get("Souvenir") as { en: string; ru: string })[
			lang
		],
		image: "images/covers/promo/souvenir.jpg",
		ingredients: [
			(translatedIngredients.get("Tasty") as { en: string; ru: string })[lang],
		],
		date: "07.04.2022",
		variants: [
			{ type: types.small[lang], price: 200 },
			{ type: types.large[lang], price: 380 },
		],
		tastyFee: 0,
	},
	{
		name: (
			translatedIngredients.get("Invite") as {
				en: string;
				ru: string;
			}
		)[lang],
		image: "images/covers/promo/friend.jpg",
		ingredients: [
			(translatedIngredients.get("Tasty") as { en: string; ru: string })[lang],
		],
		date: "07.04.2022",
		variants: [
			{ type: types.small[lang], price: 210 },
			{ type: types.large[lang], price: 390 },
		],
		tastyFee: 0,
	},
	{
		name: (translatedIngredients.get("Birthday") as { en: string; ru: string })[
			lang
		],
		image: "images/covers/promo/birth.jpg",
		ingredients: [
			(translatedIngredients.get("Tasty") as { en: string; ru: string })[lang],
		],
		date: "04.04.2022",
		variants: [
			{ type: types.small[lang], price: 150 },
			{ type: types.large[lang], price: 270 },
		],
		tastyFee: 0,
	},
	{
		name: (
			translatedIngredients.get("FirstOrder") as { en: string; ru: string }
		)[lang],
		image: "images/covers/promo/2000first.jpg",
		ingredients: [
			(translatedIngredients.get("Tasty") as { en: string; ru: string })[lang],
		],
		date: "04.04.2022",
		variants: [
			{ type: types.small[lang], price: 60 },
			{ type: types.large[lang], price: 100 },
		],
		tastyFee: 0,
	},
	{
		name: (
			translatedIngredients.get("FIRST1") as {
				en: string;
				ru: string;
			}
		)[lang],
		image: "images/covers/promo/30percent.jpg",
		ingredients: [
			(translatedIngredients.get("30") as { en: string; ru: string })[lang],
		],
		date: "03.04.2022",
		variants: [
			{ type: types.small[lang], price: 70 },
			{ type: types.large[lang], price: 120 },
		],
		tastyFee: 0,
	},
	{
		name: (translatedIngredients.get("MakeSet") as { en: string; ru: string })[
			lang
		],
		image: "images/covers/promo/welcome.jpg",
		ingredients: [
			(translatedIngredients.get("Tasty") as { en: string; ru: string })[lang],
		],
		date: "03.04.2022",
		variants: [
			{ type: types.small[lang], price: 150 },
			{ type: types.large[lang], price: 250 },
		],
		tastyFee: 0,
	},
];

export default promo;
