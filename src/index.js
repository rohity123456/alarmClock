import readline from 'readline';
import { handleCommand } from './user/inputUtils.js';
import { alarmManager } from './AlarmManager.js';
import { clock } from './Clock.js';

class Main {
  static rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  static showMenu() {
    console.log(
      '\nCurrent Time: ' +
        clock.currentTime.toLocaleTimeString('en-US', {
          hour12: false,
          hour: 'numeric',
          minute: 'numeric',
          weekday: 'long'
        })
    );
    console.log('\nAvailable commands:');
    console.log('1. add <HH:MM> <Day> - Add an alarm (ex: add 12:00 Mon)');
    console.log('2. delete <index> - Delete an alarm (ex: delete 1)');
    console.log('3. list - List all alarms (ex: list)');
    console.log('4. snooze <index> - Snooze an alarm (ex: snooze 1)');
    console.log('5. exit - Exit the application\n');
  }
  static alarmChecker() {
    setInterval(() => {
      clock.updateCurrentTime();
      alarmManager.checkAlarms(clock.currentTime);
    }, 5000);
  }
  static mainLoop() {
    Main.showMenu();
    Main.rl.on('line', (command) => {
      handleCommand(command);
      if (command !== 'exit') {
        Main.showMenu();
      } else {
        process.exit();
      }
    });
  }
}

(async () => {
  Main.alarmChecker();
  Main.mainLoop();
})();
