import { Attribute } from './attribute.model';

export class ArrayAttribute<T> extends Attribute<T[]> {

    constructor(initValue: T[]) {
        super(initValue);
    }

    public push(item: T): number {
        const returnValue = this.value.push(item);
        this.observable.next(this.value);
        return returnValue;
    }

}
