import { Injectable } from '@angular/core';

import { StackedItem } from './../models/interfaces.model';
import { ItemType } from './../models/items/item-type.enum';
import { Item } from './../models/items/item.model';
import { ItemStacker } from './../util/item-stacker';

@Injectable()
export class ItemService {

    private allItems: Item[];

    private junkItems: Item[];
    private gemItems: Item[];

    constructor() {}

    public getById(id: number): Item {
        let match: Item;
        this.allItems.forEach(i => {
            if (i.id === id) {
                match = i;
            }
        });
        return match;
    }

    public get(type: ItemType): Item[] {
        switch (type) {
            case ItemType.Junk: return this.junkItems;
            case ItemType.Gem: return this.gemItems;
            default: return [];
        }
    }

    public getRandom(type: ItemType, amount: number = 1): StackedItem[] {
        const items = this.get(type);
        const stacker = new ItemStacker();
        for (let i = 0; i < amount; i++) {
            const next = items[Math.floor(Math.random() * items.length)];
            stacker.addItem(next);
        }
        return stacker.items.get();
    }

    public import(junk: Item[], gems: Item[]): void {
        this.junkItems = junk;
        this.gemItems = gems;

        this.allItems = [].concat(this.junkItems, this.gemItems);
    }

}
