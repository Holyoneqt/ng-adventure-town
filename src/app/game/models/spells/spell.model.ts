import { Heal } from './heal.spell';
import { Entity } from './../entities/entity.model';

export abstract class Spell {

    name: string;
    rank: number;

    cost: number;
    cast: (c: Entity, t?: Entity) => void;

}

export class Spells {

    public static Heal = new Heal();

}
