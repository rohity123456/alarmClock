import { alarmManager } from '../AlarmManager.js';
import { Utils } from '../helpers/utils.js';

function handleCommand(command) {
  const parts = command.split(' ');
  const action = parts[0];

  switch (action) {
    case 'add':
      if (parts.length === 3 || parts.length === 4) {
        const [_, time, day] = parts;
        const parsed = Utils.parseTimeAndDay(`${time} ${day}`);

        if (parsed) {
          const { hours, minutes, validDay } = parsed;
          let alarmTime = new Date();
          alarmTime.setHours(hours, minutes, 0, 0);
          alarmManager.addAlarm(alarmTime, validDay);
        } else {
          console.log('Invalid time or day format. Usage: add <HH:MM> <Day>');
        }
      } else {
        console.log('Usage: add <HH:MM> <Day>');
      }
      break;
    case 'delete':
      if (parts.length === 2) {
        const index = parts[1];
        alarmManager.deleteAlarm(index);
      } else {
        console.log('Usage: delete <index>');
      }
      break;
    case 'list':
      alarmManager.listAlarms();
      break;
    case 'snooze':
      if (parts.length === 2) {
        const index = parseInt(parts[1], 10) - 1;
        if (index >= 0 && index < alarmManager.alarms.length) {
          alarmManager.alarms[index].snoozeAlarm();
        } else {
          console.log('Invalid alarm index.');
        }
      } else {
        console.log('Usage: snooze <index>');
      }
      break;
    case 'exit':
      console.log('Exiting...');
      break;
    default:
      console.log(
        'Unknown command. Please use: add, delete, list, snooze, exit.'
      );
  }
}

export { handleCommand };
