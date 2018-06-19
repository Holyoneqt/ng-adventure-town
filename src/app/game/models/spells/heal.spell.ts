import { Entity } from './../entities/entity.model';
import { Resource } from './../resources.enum';
import { Spell } from './spell.model';
import { Spells } from './spells.enum';

export class Heal extends Spell {
    
    constructor() {
        super();
        this.name = Spells.Heal;
        this.icon = 'local_hospital';
        this.color = 'primary';
        this.loadRank(1);
    }
    
    public cast(caster: Entity, target?: Entity): void {
        target = (target) ? target : caster; // Check if Target is available, else its a selfcast
        target.heal(caster.attributes.spellPower * this.spMod);
    }

    public loadRank(rank: number): void {
        const rankData = healRanks[rank - 1];
        this.rank = rankData.rank;
        this.manaCost = rankData.manaCost;
        this.spMod = rankData.spMod;
    }

}

const healRanks = [
    { rank: 1, cost: { type: Resource.Gold, amount: 5 }, manaCost: 5, spMod: 2 },
    { rank: 2, cost: { type: Resource.Gold, amount: 50 }, manaCost: 5, spMod: 5 },
    { rank: 3, cost: { type: Resource.Gold, amount: 500 }, manaCost: 4, spMod: 10 },
    { rank: 4, cost: { type: Resource.Gold, amount: 2000 }, manaCost: 4, spMod: 15 },
    { rank: 5, cost: { type: Resource.Gold, amount: 4500 }, manaCost: 3, spMod: 15 },
];
