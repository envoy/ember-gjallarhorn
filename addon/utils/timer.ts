export class Timer {
  startLabel = '';
  stopLabel = '';

  constructor(public label: string) {}

  get time() {
    window.performance.measure(this.label, this.startLabel, this.stopLabel);
    let measures: Array<PerformanceMeasure> = window.performance.getEntriesByName(this.label);
    return measures[0];
  }

  get status() {
    return `${this.label} - ${Math.floor(this.time.duration)} ms`;
  }

  start() {
    this.startLabel = `${this.label}-start`;
    window.performance.mark(this.startLabel);
  }

  stop() {
    this.stopLabel = `${this.label}-stop`;
    window.performance.mark(this.stopLabel);
  }
}

export default Timer;
