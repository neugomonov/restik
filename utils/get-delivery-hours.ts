import {
	parse,
	isBefore,
	addDays,
	isWithinInterval,
	isToday,
	differenceInHours,
	lightFormat,
	addHours
} from 'date-fns';

import info from '../lib/info';

type Schedule = Record<number, {
	opens: string;
	closes: string;
}>;

const {schedule, averageDelivery, holidays, isDevelopment} = info;

export const getDeliveryHours = (date: Date): string[] | undefined => {
	const dayOfTheWeek = date.getDay();
	const times = (schedule as Schedule)[dayOfTheWeek];

	const opens = parse(times.opens, 'HH:mm', date);
	let closes = parse(times.closes, 'HH:mm', date);
	let isHoliday = false;

	// Если дата закрытия раньше даты открытия - прибавить к ней 1 день.
	if (isBefore(closes, opens)) {
		closes = addDays(closes, 1);
	}

	// Является ли текущая дата одним из выходных.
	for (const day of holidays) {
		if (isToday(parse(day, 'dd/MM', date))) {
			isHoliday = true;
		}
	}

	// Не разрешать заказы, если текущая дата не указана в расписании ресторана.
	// if ((!isWithinInterval(date, {start: opens, end: closes}) || isHoliday || times.opens === '0') && !isDevelopment) {
	// 	return undefined;
	// }

	const suggestions = [];

	// Показывать предложения каждый час.
	// TODO: сделать каждые 30 минут.
	for (let t = averageDelivery; t <= (isDevelopment ? 12 : differenceInHours(closes, date)); t++) {
		suggestions.push(lightFormat(addHours(date, t), 'HH:mm'));
	}

	return suggestions;
};
