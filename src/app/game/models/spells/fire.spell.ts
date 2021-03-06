import { Entity } from '../entities/entity.model';
import { Game } from '../game.model';
import { SpellRankData } from '../interfaces.model';
import { Resource } from '../resources.enum';
import { Spell } from './spell.model';
import { Spells } from './spells.enum';

export class FireSpell extends Spell {
    
    constructor(game: Game) {
        super(game);
        this.name = Spells.Fire;
        this.icon = 'whatshot';
        this.color = 'warn';
        this.maxRank = 5;
        this.loadRank(0);
    }
    
    public cast(caster: Entity, target?: Entity): void {
        target = (target) ? target : caster; // Check if Target is available, else its a selfcast
        target.takeDamage(caster.spellDamage.get() * this.spMod);
    }

    public getNextSpellRankData(): SpellRankData {
        const data = fireRanks[this.rank + 1];
        return data;
    }

    public loadRank(rank: number): void {
        const rankData = fireRanks[rank];
        this.rank = rankData.rank;
        this.description = `Deals ${rankData.spMod * this.game.champion.spellDamage.get()} Damage. (Cost: ${rankData.manaCost} Mana)`;
        this.manaCost = rankData.manaCost;
        this.spMod = rankData.spMod;
    }

}

const fireRanks: SpellRankData[] = [
    { rank: 0, cost: { type: Resource.Gold, amount: 0 }, manaCost: 0, spMod: 0 },
    { rank: 1, cost: { type: Resource.Gold, amount: 5 }, manaCost: 2, spMod: 2 },
    { rank: 2, cost: { type: Resource.Gold, amount: 50 }, manaCost: 2, spMod: 5 },
    { rank: 3, cost: { type: Resource.Gold, amount: 500 }, manaCost: 2, spMod: 10 },
    { rank: 4, cost: { type: Resource.Gold, amount: 2000 }, manaCost: 2, spMod: 15 },
    { rank: 5, cost: { type: Resource.Gold, amount: 4500 }, manaCost: 5, spMod: 50 },
];
