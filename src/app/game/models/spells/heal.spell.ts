import { Entity } from '../entities/entity.model';
import { Game } from '../game.model';
import { SpellRankData } from '../interfaces.model';
import { Resource } from '../resources.enum';
import { Spell } from './spell.model';
import { Spells } from './spells.enum';

export class HealSpell extends Spell {
    
    constructor(game: Game) {
        super(game);
        this.name = Spells.Heal;
        this.icon = 'local_hospital';
        this.color = 'primary';
        this.loadRank(0);
    }
    
    public cast(caster: Entity, target?: Entity): void {
        target = caster; // Currently always selfcast
        target.heal(caster.spellPower.get() * this.spMod);
    }

    public getNextSpellRankData(): SpellRankData {
        const data = healRanks[this.rank + 1]; 
        return data;
    }

    public loadRank(rank: number): void {
        const rankData = healRanks[rank];
        this.rank = rankData.rank;
        this.manaCost = rankData.manaCost;
        this.spMod = rankData.spMod;
        this.description = `Heals you for ${this.spMod * this.game.champion.spellPower.get()} Healthpoints. (Cost: ${this.manaCost} Mana)`;
    }

}

const healRanks: SpellRankData[] = [
    { rank: 0, cost: { type: Resource.Gold, amount: 0 }, manaCost: 0, spMod: 0 },
    { rank: 1, cost: { type: Resource.Gold, amount: 5 }, manaCost: 5, spMod: 2 },
    { rank: 2, cost: { type: Resource.Gold, amount: 50 }, manaCost: 5, spMod: 5 },
    { rank: 3, cost: { type: Resource.Gold, amount: 500 }, manaCost: 4, spMod: 10 },
    { rank: 4, cost: { type: Resource.Gold, amount: 2000 }, manaCost: 4, spMod: 15 },
    { rank: 5, cost: { type: Resource.Gold, amount: 4500 }, manaCost: 3, spMod: 15 },
];
