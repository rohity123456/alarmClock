export class Utils {
  static parseTimeAndDay(input) {
    const timeRegex = /^(\d{1,2}):(\d{2})$/;
    const dayRegex =
      /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$/i;

    const [time, day] = input.split(' ');

    const timeMatch = timeRegex.exec(time);
    const dayMatch = dayRegex.exec(day);

    if (timeMatch && dayMatch) {
      const hours = parseInt(timeMatch[1], 10);
      const minutes = parseInt(timeMatch[2], 10);
      const validDay = dayMatch[0].slice(0, 3).toLowerCase();

      if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
        return { hours, minutes, validDay };
      }
    }
    return null;
  }

  static getValidDayIndex(day) {
    day = day.slice(0, 3).toLowerCase();
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    return days.findIndex((d) => d === day) + 1;
  }

  static setDayInDate(date, day) {
    const dayIndex = Utils.getValidDayIndex(day);
    const diff =
      dayIndex == date.getDay() ? 0 : (dayIndex - date.getDay() + 7) % 7;
    date.setDate(date.getDate() + diff);
    return date;
  }
}
