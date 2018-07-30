import { Attribute } from '../attributes/attribute.model';
import { NumberAttribute } from '../attributes/number.attribute';
import { ItemType } from './item-type.enum';

export class Item {

    public id: number;

    public name: Attribute<string>;
    public description: Attribute<string>;

    public goldValue: NumberAttribute;

    public type: ItemType;

    constructor(id: number, name: string, desc: string, goldValue: number, type: ItemType) {
        this.id = id;
        this.name = new Attribute(name);
        this.description = new Attribute(desc);
        this.goldValue = new NumberAttribute(goldValue);
        this.type = type;
    }

}
