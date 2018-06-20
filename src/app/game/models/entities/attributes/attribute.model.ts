import { BehaviorSubject, Subscription } from 'rxjs';

export class Attribute<T> {

    protected value: T;
    protected observable: BehaviorSubject<T>;

    constructor(initValue: T) {
        this.value = initValue;
        this.observable = new BehaviorSubject(initValue);
        this.observable.subscribe(change => this.value = change);
    }

    public get(): T {
        return this.value;
    }

    public set(val: T): void {
        this.observable.next(val);
    }
    
    public subscribe(func: (value: T) => void): Subscription {
        return this.observable.subscribe(func);
    }

}
