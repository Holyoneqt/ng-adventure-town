import { Attribute } from './attribute.model';

export class NumberAttribute extends Attribute<number> {

    constructor(initValue: number) {
        super(initValue);
    }

    public increase(val: number): void {
        this.observable.next(this.value + val);
    }

    public decrease(val: number): void {
        this.observable.next(this.value - val);
    }

    public multiply(val: number): void {
        this.observable.next(this.value * val);
    }

    public divide(val: number): void {
        this.observable.next(Math.round(this.value / val));
    }

}
