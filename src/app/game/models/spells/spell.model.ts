import { SpellRankData } from './../interfaces.model';
import { HealSpell } from './heal.spell';
import { Entity } from './../entities/entity.model';

export abstract class Spell {

    public name: string;
    public rank: number;
    public manaCost: number;

    public icon: string;
    public color: string;

    protected spMod: number;

    public cast(c: Entity, t?: Entity): void {}
    public getNextSpellRankData(): SpellRankData {
        return undefined;
    }
    public loadRank(rank: number): void {}

}
