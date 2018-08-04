import { Entity } from '../entities/entity.model';
import { Game } from '../game.model';
import { SpellRankData } from '../interfaces.model';
import { Resource } from '../resources.enum';
import { Spell } from './spell.model';
import { Spells } from './spells.enum';

export class Attack extends Spell {
    
    constructor(game: Game) {
        super(game);
        this.name = Spells.Attack;
        this.icon = 'gavel';
        this.color = 'accent';
        this.maxRank = 6;
        this.loadRank(1);
    }
    
    public cast(caster: Entity, target?: Entity): void {
        target = (target) ? target : caster; // Check if Target is available, else its a selfcast
        target.takeDamage(Math.floor(caster.physicalDamage.get() * this.spMod));
    }

    public getNextSpellRankData(): SpellRankData {
        const data = attackRanks[this.rank + 1];
        return data;
    }

    public loadRank(rank: number): void {
        const rankData = attackRanks[rank];
        this.rank = rankData.rank;
        this.description = `Attack with your Weapon to deal Damage equal to ${rankData.spMod} times your Physical Damage (${Math.floor(rankData.spMod * this.game.champion.physicalDamage.get())} Damage.)`;
        this.manaCost = rankData.manaCost;
        this.spMod = rankData.spMod;
    }

}

const attackRanks: SpellRankData[] = [
    { rank: 0, cost: { type: Resource.Gold, amount: 0 }, manaCost: 0, spMod: 1 },
    { rank: 1, cost: { type: Resource.Gold, amount: 0 }, manaCost: 0, spMod: 1 },
    { rank: 2, cost: { type: Resource.Gold, amount: 100 }, manaCost: 0, spMod: 1.1 },
    { rank: 3, cost: { type: Resource.Gold, amount: 500 }, manaCost: 0, spMod: 1.2 },
    { rank: 4, cost: { type: Resource.Gold, amount: 2000 }, manaCost: 0, spMod: 1.3 },
    { rank: 5, cost: { type: Resource.Gold, amount: 5000 }, manaCost: 0, spMod: 1.4 },
    { rank: 6, cost: { type: Resource.Gold, amount: 8000 }, manaCost: 0, spMod: 1.5 },
];
