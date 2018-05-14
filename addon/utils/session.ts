import Timer from './timer';

export class Session {
  sessionLabel: string;
  timers: Map<string, Timer>;

  constructor(label: string) {
    this.sessionLabel = label;
    this.timers = new Map();
  }

  start(label = 'start') {
    let timer = new Timer(label);
    timer.start();
    this.timers.set(label, timer);
    return timer;
  }

  stop(timer: Timer | string) {
    let timerLabel;
    if (timer instanceof Timer) {
      timerLabel = timer.label;
    } else {
      timerLabel = timer;
    }

    let timerInstance = this.timers.get(timerLabel);

    if (timerInstance) {
      timerInstance.stop();
    }
  }

  get status() {
    let timerList = Array.from(this.timers);

    return timerList.map(timer => {
      return timer[1].data;
    });
  }
}

export default Session;
