import {
	parse,
	isBefore,
	addDays,
	isToday,
	differenceInHours,
	lightFormat,
	addHours,
} from "date-fns";

import info from "../lib/info";

type Schedule = Record<
	number,
	{
		opens: string;
		closes: string;
	}
>;

const { schedule, averageDelivery, holidays, isDevelopment } = info;

export const getDeliveryHours = (date: Date): string[] | undefined => {
	const dayOfTheWeek = date.getDay();
	const times = (schedule as Schedule)[dayOfTheWeek];

	const opens = parse(times.opens, "HH:mm", date);
	let closes = parse(times.closes, "HH:mm", date);
	let isHoliday = false;

	// If the closing date is earlier than the opening date, add 1 day to it. 🤯
	if (isBefore(closes, opens)) {
		closes = addDays(closes, 1);
	}

	// Is the current date one of the holidays.
	for (const day of holidays) {
		if (isToday(parse(day, "dd/MM", date))) {
			isHoliday = true;
		}
	}

	// Do not allow orders at certain times.
	// if ((!isWithinInterval(date, {start: opens, end: closes}) || isHoliday || times.opens === '0') && !isDevelopment) {
	// 	return undefined;
	// }

	const suggestions = [];

	// Show offers every hour.
	// TODO: make it 30 minutes.
	for (
		let t = averageDelivery;
		t <= (isDevelopment ? 12 : differenceInHours(closes, date));
		t++
	) {
		suggestions.push(lightFormat(addHours(date, t), "HH:mm"));
	}

	return suggestions;
};
