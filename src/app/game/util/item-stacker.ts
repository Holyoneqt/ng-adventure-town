import { ArrayAttribute } from '../models/attributes/array.attribute';
import { StackedItem } from '../models/interfaces.model';
import { Item } from './../models/items/item.model';

export class ItemStacker {

    public items: ArrayAttribute<StackedItem>;

    constructor() {
        this.items = new ArrayAttribute([]);
    }

    public addItem(item: Item): void {
        if (this.isAlreadyPresent(item)) {
            this.addToStack(item);
        } else {
            // NOTE: Currently only accepts one Item that can be added.
            this.items.push({ item: item, amount: 1 });
        }
    }

    public addItems(items: StackedItem[]): void {
        for (let i = 0; i < items.length; i++) {
            const stack = items[i];
            for (let j = 0; j < stack.amount; j++) {
                this.addItem(stack.item);
            }
        }
    }

    public removeItem(item: Item, amount: number = 1): void {
        // Remove amount and just filter out items that contain 0 or less
        const copy = [ ...this.items.get() ];
        copy.map(i => i.amount -= amount);
        copy.filter(i => i.amount > 0);
        this.items.set(copy);
    }

    private addToStack(item: Item): void {
        if (!this.isAlreadyPresent(item)) {
            throw new Error('Tried adding a Item to a Stack that is currently not present.');
        }
        const copy = [ ...this.items.get() ];
        copy.map(i => {
            if (i.item.id === item.id) {
                i.amount += 1;
            }
            return i;
        });
        this.items.set(copy);
    }

    private isAlreadyPresent(item: Item): boolean {
        return (this.items.get().find(i => i.item.id === item.id) !== undefined);
    }
    
}
