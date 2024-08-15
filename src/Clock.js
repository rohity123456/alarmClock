export class Clock {
  #currentTime;

  constructor() {
    this.currentTime = new Date();
  }

  get currentTime() {
    return this.#currentTime;
  }

  set currentTime(value) {
    this.#currentTime = new Date(value);
  }

  updateCurrentTime() {
    this.currentTime = new Date();
  }

  displayCurrentTime() {
    console.log(`Current Time: ${this.#currentTime.toLocaleTimeString()}`);
  }
}

export const clock = new Clock();
