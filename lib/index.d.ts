export declare const connectStore: (superclass: any) => {
    new (): {
        [x: string]: any;
        update(): void;
        _initStateObservers(): void;
        _addStateObservers(stateVars: any): void;
        _clearStateObservers(): void;
    };
    [x: string]: any;
};
export declare class createGluang {
    private _observers;
    constructor();
    addObserver(observer: any, keys: any): void;
    removeObserver(observer: any): void;
    _initStateVars(): void;
    _initStateVar(key: any, options: any): void;
    _parseOptions(options: any): any;
    _recordRead(key: any): void;
    _notifyChange(key: any): void;
}
export declare class StateVar {
    options: Object;
    recordRead: any;
    notifyChange: any;
    value: undefined;
    constructor(args: any);
    get(): undefined;
    set(value: any): void;
    shouldSetValue(value: any): boolean;
}
export declare function stateVar(options?: any): (element: any) => {
    kind: string;
    key: symbol;
    placement: string;
    descriptor: {};
    initializer(): void;
    finisher(stateClass: any): void;
};
declare class StateRecorder {
    #private;
    constructor();
    start(): void;
    recordRead(stateObj: any, key: any): void;
    finish(): any;
}
export declare const stateRecorder: StateRecorder;
export {};
