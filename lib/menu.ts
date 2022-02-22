import info from './info';

const {types} = info;

const translatedIngredients = new Map([
	['Dumplings', {en: 'Dumplings', ru: 'Манты'}],
	['Borsch', {en: 'Borsch', ru: 'Борщ лол'}],
	['Pilaf', {en: 'Pilaf', ru: 'Плоу'}],
	['Khachapuri', {en: 'Khachapuri', ru: 'Хачапури'}],
	['Shawarma', {en: 'Shawarma', ru: 'Шаурма'}],
	['Rahat-lukum', {en: 'Rahat-lukum', ru: 'Рахат-лукум'}],
	['Baklava', {en: 'Baklava', ru: 'Пахлава'}],
	['Sherbet', {en: 'Sherbet', ru: 'Щербет'}],
	['Nougat', {en: 'Nougat', ru: 'Нуга'}],

	['Cheese', {en: 'Cheese', ru: 'Сыр'}],
	['Mushrooms', {en: 'Mushrooms', ru: 'Грибы'}],
	['Ham', {en: 'Ham', ru: 'Ветчина'}],
	['Olives', {en: 'Olives', ru: 'Оливки'}],
	['Oregano', {en: 'Oregano', ru: 'Душица '}],
	['Pepper', {en: 'Pepper', ru: 'Перец'}],
	['Rice', {en: 'Rice', ru: 'Рис'}],
	['Saffron', {en: 'Saffron', ru: 'Шафран'}],
	['Turmeric', {en: 'Turmeric', ru: 'Куркума'}],
	['Chicken', {en: 'Chicken', ru: 'Курица'}],

]);

const menu = (lang: 'en' | 'ru') => [
	{
		name: (translatedIngredients.get('Dumplings') as { en: string; ru: string})[lang],
		image: 'images/covers/Dumplings.jpg',
		ingredients: [
			(translatedIngredients.get('Chicken') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Oregano') as { en: string; ru: string})[lang]
		],
		variants: [
			{type: types.small[lang], price: 280},
			{type: types.large[lang], price: 380}
		],
		tastyFee: 0
	},
	{
		name: (translatedIngredients.get('Borsch') as { en: string; ru: string})[lang],
		image: 'images/covers/Borsch.jpg',
		ingredients: [
			(translatedIngredients.get('Chicken') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Pepper') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Oregano') as { en: string; ru: string})[lang],
		],
		variants: [
			{type: types.small[lang], price: 120},
			{type: types.large[lang], price: 200}
		],
		tastyFee: 0
	},
	{
		name: (translatedIngredients.get('Pilaf') as { en: string; ru: string})[lang],
		image: 'images/covers/Pilaf.jpg',
		ingredients: [
			(translatedIngredients.get('Rice') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Saffron') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Turmeric') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Chicken') as { en: string; ru: string})[lang],
		],
		variants: [
			{type: types.small[lang], price: 210},
			{type: types.large[lang], price: 390}
		],
		tastyFee: 0
	},
	{
		name: (translatedIngredients.get('Khachapuri') as { en: string; ru: string})[lang],
		image: 'images/covers/Khachapuri.jpg',
		ingredients: [
			(translatedIngredients.get('Chicken') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Mushrooms') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Ham') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Olives') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Cheese') as { en: string; ru: string})[lang]
		],
		variants: [
			{type: types.small[lang], price: 200},
			{type: types.large[lang], price: 380}
		],
		tastyFee: 0
	},
	{
		name: (translatedIngredients.get('Shawarma') as { en: string; ru: string})[lang],
		image: 'images/covers/shawarma.jpg',
		ingredients: [
			(translatedIngredients.get('Chicken') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Mushrooms') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Ham') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Olives') as { en: string; ru: string})[lang]
		],
		variants: [
			{type: types.small[lang], price: 210},
			{type: types.large[lang], price: 390}
		],
		tastyFee: 0
	},
	{
		name: (translatedIngredients.get('Rahat-lukum') as { en: string; ru: string})[lang],
		image: 'images/covers/rahat-lukum.jpg',
		ingredients: [
			(translatedIngredients.get('Chicken') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Mushrooms') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Ham') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Olives') as { en: string; ru: string})[lang]
		],
		variants: [
			{type: types.small[lang], price: 150},
			{type: types.large[lang], price: 270}
		],
		tastyFee: 0
	},
	{
		name: (translatedIngredients.get('Baklava') as { en: string; ru: string})[lang],
		image: 'images/covers/Baklava.jpg',
		ingredients: [
			(translatedIngredients.get('Chicken') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Mushrooms') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Ham') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Olives') as { en: string; ru: string})[lang]
		],
		variants: [
			{type: types.small[lang], price: 160},
			{type: types.large[lang], price: 300}
		],
		tastyFee: 0
	},
	{
		name: (translatedIngredients.get('Sherbet') as { en: string; ru: string})[lang],
		image: 'images/covers/sherbet.jpg',
		ingredients: [
			(translatedIngredients.get('Chicken') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Mushrooms') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Ham') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Olives') as { en: string; ru: string})[lang]
		],
		variants: [
			{type: types.small[lang], price: 220},
			{type: types.large[lang], price: 400}
		],
		tastyFee: 0
	},
	{
		name: (translatedIngredients.get('Nougat') as { en: string; ru: string})[lang],
		image: 'images/covers/nougat.jpg',
		ingredients: [
			(translatedIngredients.get('Chicken') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Mushrooms') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Ham') as { en: string; ru: string})[lang],
			(translatedIngredients.get('Olives') as { en: string; ru: string})[lang]
		],
		variants: [
			{type: types.small[lang], price: 210},
			{type: types.large[lang], price: 390}
		],
		tastyFee: 0
	}
];

export default menu;
