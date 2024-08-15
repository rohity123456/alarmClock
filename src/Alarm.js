import { CONSTANTS } from './helpers/constants.js';

export class Alarm {
  #alarmTime;
  #dayOfWeek;
  #snoozeCount;

  constructor(alarmTime, dayOfWeek) {
    this.#alarmTime = new Date(alarmTime);
    this.#dayOfWeek = dayOfWeek;
    this.#snoozeCount = 0;
  }

  get alarmTime() {
    return this.#alarmTime;
  }

  set alarmTime(value) {
    this.#alarmTime = new Date(value);
  }

  get dayOfWeek() {
    return this.#dayOfWeek;
  }

  set dayOfWeek(value) {
    this.#dayOfWeek = value;
  }

  get snoozeCount() {
    return this.#snoozeCount;
  }

  set snoozeCount(value) {
    this.#snoozeCount = value;
  }

  getSnoozedTime() {
    return new Date(
      this.alarmTime.getTime() +
        CONSTANTS.SNOOZE_TIME * 60000 * this.snoozeCount
    ); // Add Snooze Count * 5 minutes
  }

  snoozeAlarm() {
    if (this.snoozeCount <= CONSTANTS.SNOOZE_COUNT) {
      this.snoozeCount++;
      if (this.snoozeCount >= CONSTANTS.SNOOZE_COUNT) {
        console.log('Snooze limit reached. Alarm will be disabled.');
        this.snoozeCount = 0;
      } else
        console.log(
          `Alarm snoozed to ${this.getSnoozedTime().toLocaleTimeString()}.`
        );
    }
  }
}
