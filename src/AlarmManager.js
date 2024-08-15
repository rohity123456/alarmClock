import { Alarm } from './Alarm.js';
import { CONSTANTS } from './helpers/constants.js';
import { Utils } from './helpers/utils.js';

class AlarmManager {
  #alarms;
  constructor() {
    this.alarms = [];
  }

  get alarms() {
    return this.#alarms;
  }

  set alarms(value) {
    this.#alarms = value;
  }

  addAlarm(alarmTime, dayOfWeek) {
    const newAlarm = new Alarm(alarmTime, dayOfWeek);
    this.alarms.push(newAlarm);
    console.log(
      `Alarm set for ${newAlarm.alarmTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
      })}`
    );
  }

  deleteAlarm(index) {
    index = parseInt(index) - 1;
    if (index >= 0 && index < this.alarms.length) {
      this.alarms.splice(index, 1);
      console.log(`Alarm ${index + 1} deleted.`);
    } else {
      console.log('Invalid alarm index.');
    }
  }

  listAlarms() {
    this.alarms.forEach((alarm, index) => {
      console.log(
        `${index + 1}. Alarm set for ${alarm.alarmTime.toLocaleTimeString(
          'en-US',
          {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            weekday: 'long'
          }
        )} ${
          (alarm.snoozeCount && 'snoozed ' + alarm.snoozeCount + ' times') || ''
        }`
      );
    });
  }

  checkAlarms(currentTime) {
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    this.alarms.forEach((alarm, index) => {
      const snoozedTime = alarm.getSnoozedTime();
      const snoozedHours = snoozedTime.getHours();
      const snoozedMinutes = snoozedTime.getMinutes();
      if (
        snoozedTime <= currentTime &&
        Utils.getValidDayIndex(alarm.dayOfWeek) === currentTime.getDay() &&
        currentHours === snoozedHours &&
        alarm.snoozeCount <= CONSTANTS.SNOOZE_COUNT &&
        currentMinutes === snoozedMinutes
      ) {
        console.log(`\nAlarm ${index + 1} is ringing!`);
        alarm.snoozeAlarm();
      }
    });
  }
}

export const alarmManager = new AlarmManager();
