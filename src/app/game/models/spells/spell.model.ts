import { Heal } from './heal.spell';
import { Entity } from './../entities/entity.model';

export abstract class Spell {

    public name: string;
    public rank: number;
    public manaCost: number;

    public icon: string;
    public color: string;

    protected spMod: number;

    public cast(c: Entity, t?: Entity): void {}
    public loadRank(rank: number): void {}

}
