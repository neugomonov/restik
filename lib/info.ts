const info = {
	name: "Пиццерия",
	description: {
		en: "Your favorite pizzeria! We offer fresh and tasty food and low prices.",
		ru: "Ваша любимая пиццерия! Мы предлагаем свежую и вкусную еду и низкие цены.",
	},
	currency: "₽",
	callingCode: "+7",

	schedule: {
		0: {
			opens: "12:00",
			closes: "22:00",
		},
		1: {
			opens: "12:00",
			closes: "22:00",
		},
		2: {
			opens: "12:00",
			closes: "22:00",
		},
		3: {
			opens: "12:00",
			closes: "22:00",
		},
		4: {
			opens: "12:00",
			closes: "22:00",
		},
		5: {
			opens: "12:00",
			closes: "23:00",
		},
		6: {
			opens: "0",
			closes: "0",
		},
	},
	averageDelivery: 1,
	holidays: ["28/09"],
	types: {
		small: {
			en: "Small",
			ru: "Немного",
		},
		large: {
			en: "Large",
			ru: "Много",
		},
	},
	isDevelopment: true,
};

export default info;
