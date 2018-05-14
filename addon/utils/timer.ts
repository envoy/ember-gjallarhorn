interface Node {
  value: any;
  children: Array<Node>;

  isRoot: boolean;
  hasChildren: boolean;

  append(child: Node): Node;
}

export class Timer implements Node {
  private _children: Array<Timer> = [];
  private _parent: Timer | null = null;

  startLabel = '';
  stopLabel = '';

  constructor(public label: string) {}

  get value() {
    window.performance.measure(this.label, this.startLabel, this.stopLabel);
    let measures: Array<PerformanceMeasure> = window.performance.getEntriesByName(this.label);
    return measures[0];
  }

  get isRoot() {
    return !this._parent;
  }

  get children() {
    return this._children;
  }

  get hasChildren() {
    return this._children.length > 0;
  }

  start() {
    this.startLabel = `${this.label}-start`;
    window.performance.mark(this.startLabel);
  }

  stop() {
    this.stopLabel = `${this.label}-stop`;
    window.performance.mark(this.stopLabel);
  }

  appendAndStart(label: string): Timer {
    let child = new Timer(`${this.label}:${label}`);
    child._parent = this;
    this._children.push(child);
    child.start();
    return child;
  }

  append(child: Timer): Timer {
    child._parent = this;
    this._children.push(child);
    return this;
  }

  clear() {
    window.performance.clearMarks(this.startLabel);
    window.performance.clearMarks(this.stopLabel);
    window.performance.clearMeasures(this.label);

    if (this.hasChildren) {
      this.children.forEach(child => {
        child.clear();
      })
    }
  }
}

export default Timer;
