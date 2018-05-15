export interface Node {
    value: any;
    children: Array<Node>;
    isRoot: boolean;
    hasChildren: boolean;
    append(child: Node): Node;
}
export interface TimerJSON {
    name: string;
    duration: number;
    children?: Array<TimerJSON>;
}
export declare class Timer implements Node {
    label: string;
    private _children;
    private _parent;
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
