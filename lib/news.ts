import info from './info';

const {types} = info;

const translatedIngredients = new Map([
	['Margherita', {en: 'Отследи курьера в нашем приложении!', ru: 'Отследи курьера в нашем приложении!'}],
	['Capricciosa', {en: 'Зимние предложения 2022 в пиццерии!', ru: 'Зимние предложения 2022 в пиццерии!'}],
	['Napoletana', {en: 'Вы можете заказать доставку по геопозиции!', ru: 'Вы можете заказать доставку по геопозиции! '}],
	['Calzone', {en: 'Как оплатить заказ в пиццерии?', ru: 'Как оплатить заказ в пиццерии?'}],
	['Quattro-Formaggi', {en: 'Итоги большого новогоднего розыгрыша!', ru: 'Итоги большого новогоднего розыгрыша!'}],
	['Caprese', {en: 'Пиццерия проводит IT CODE 2.0!', ru: 'Пиццерия проводит IT CODE 2.0!'}],
	['Tarhun', {en: 'Конкурс на  логотип', ru: 'Конкурс на  логотип'}],
	['Pomegranate-juice', {en: 'Итоги лотереи', ru: 'Итоги лотереи'}],
	['Latte', {en: 'Мы открылись! 🎉', ru: 'Мы открылись! 🎉'}],

	['Cheese', {en: 'Cheese', ru: 'Сыр'}],
	['Mushrooms', {en: 'Mushrooms', ru: 'Грибы'}],
	['Ham', {en: 'Ham', ru: 'Ветчина'}],
	['Olives', {en: 'Olives', ru: 'Оливки'}],
	['Oregano', {en: 'Oregano', ru: 'Душица '}],
	['Pepper', {en: 'Pepper', ru: 'Перец'}],
	['Rice', {en: 'Rice', ru: 'Рис'}],
	['Saffron', {en: 'Saffron', ru: 'Шафран'}],
	['Turmeric', {en: 'Turmeric', ru: 'Куркума'}],
	['Chicken', {en: 'Заказывайте домой, ешьте у нас, следите за нашими новостями, будет много интересного...', ru: 'Заказывайте домой, ешьте у нас, следите за нашими новостями, будет много интересного...'}],

]);

const news = (lang: 'en' | 'ru') => [
	{
		name: (translatedIngredients.get('Margherita') as { en: string; ru: string})[lang],
		image: 'images/covers/news/live.jpg',
		ingredients: [
			(translatedIngredients.get('Chicken') as { en: string; ru: string})[lang],
		],
		variants: [
			{type: types.small[lang], price: 280},
			{type: types.large[lang], price: 380}
		],
		tastyFee: 0
	},
	{
		name: (translatedIngredients.get('Calzone') as { en: string; ru: string})[lang],
		image: 'images/covers/news/howsway.jpg',
		ingredients: [
			(translatedIngredients.get('Chicken') as { en: string; ru: string})[lang],
		],
		variants: [
			{type: types.small[lang], price: 200},
			{type: types.large[lang], price: 380}
		],
		tastyFee: 0
	},
	{
		name: (translatedIngredients.get('Quattro-Formaggi') as { en: string; ru: string})[lang],
		image: 'images/covers/news/500.jpg',
		ingredients: [
			(translatedIngredients.get('Chicken') as { en: string; ru: string})[lang],
		],
		variants: [
			{type: types.small[lang], price: 210},
			{type: types.large[lang], price: 390}
		],
		tastyFee: 0
	},
	{
		name: (translatedIngredients.get('Capricciosa') as { en: string; ru: string})[lang],
		image: 'images/covers/news/newyear.jpg',
		ingredients: [
			(translatedIngredients.get('Chicken') as { en: string; ru: string})[lang],
		],
		variants: [
			{type: types.small[lang], price: 120},
			{type: types.large[lang], price: 200}
		],
		tastyFee: 0
	},
	{
		name: (translatedIngredients.get('Caprese') as { en: string; ru: string})[lang],
		image: 'images/covers/news/itcode.jpg',
		ingredients: [
			(translatedIngredients.get('Chicken') as { en: string; ru: string})[lang],
		],
		variants: [
			{type: types.small[lang], price: 150},
			{type: types.large[lang], price: 270}
		],
		tastyFee: 0
	},
	{
		name: (translatedIngredients.get('Napoletana') as { en: string; ru: string})[lang],
		image: 'images/covers/news/doyou.jpg',
		ingredients: [
			(translatedIngredients.get('Chicken') as { en: string; ru: string})[lang],
		],
		variants: [
			{type: types.small[lang], price: 210},
			{type: types.large[lang], price: 390}
		],
		tastyFee: 0
	},
	{
		name: (translatedIngredients.get('Tarhun') as { en: string; ru: string})[lang],
		image: 'images/covers/news/logo.jpg',
		ingredients: [
			(translatedIngredients.get('Chicken') as { en: string; ru: string})[lang],
		],
		variants: [
			{type: types.small[lang], price: 60},
			{type: types.large[lang], price: 100}
		],
		tastyFee: 0
	},
	{
		name: (translatedIngredients.get('Pomegranate-juice') as { en: string; ru: string})[lang],
		image: 'images/covers/news/10.jpg',
		ingredients: [
			(translatedIngredients.get('Chicken') as { en: string; ru: string})[lang],
		],
		variants: [
			{type: types.small[lang], price: 70},
			{type: types.large[lang], price: 120}
		],
		tastyFee: 0
	},
	{
		name: (translatedIngredients.get('Latte') as { en: string; ru: string})[lang],
		image: 'images/covers/news/openup.jpg',
		ingredients: [
			(translatedIngredients.get('Chicken') as { en: string; ru: string})[lang],
		],
		variants: [
			{type: types.small[lang], price: 150},
			{type: types.large[lang], price: 250}
		],
		tastyFee: 0
	}
];

export default news;
