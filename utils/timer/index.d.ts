import { TimerJSON } from './types';
export declare class Timer {
    label: string;
    private _children;
    private _parent;
    private performance;
    startLabel: string;
    stopLabel: string;
    constructor(label: string);
    readonly value: PerformanceMeasure;
    readonly isRoot: boolean;
    readonly children: Timer[];
    readonly hasChildren: boolean;
    start(): void;
    stop(): void;
    startChild(label: string): Timer;
    stopChild(label: string): Timer;
    append(child: Timer): Timer;
    clear(): void;
    toJSON(): TimerJSON;
}
export default Timer;
