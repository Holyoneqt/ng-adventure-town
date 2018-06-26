import { Entity } from './../entities/entity.model';
import { Game } from './../game.model';
import { SpellRankData } from './../interfaces.model';
import { Resource } from './../resources.enum';
import { Spell } from './spell.model';
import { Spells } from './spells.enum';

export class SiphonSpell extends Spell {
    
    constructor(game: Game) {
        super(game);
        this.name = Spells.Siphon;
        this.icon = 'blur_linear';
        this.color = 'primary';
        this.loadRank(0);
    }
    
    public cast(caster: Entity, target?: Entity): void {
        const damageToDeal = caster.spellDamage.get() * this.spMod;
        const healValue = Math.round(damageToDeal * 0.5);
        target.takeDamage(damageToDeal);
        caster.heal(healValue);
    }

    public getNextSpellRankData(): SpellRankData {
        const data = siphonRanks[this.rank + 1]; 
        return data;
    }

    public loadRank(rank: number): void {
        const rankData = siphonRanks[rank];
        this.rank = rankData.rank;
        this.manaCost = rankData.manaCost;
        this.spMod = rankData.spMod;
        this.description = `Deals ${this.spMod * this.game.champion.spellDamage.get()} Damage and heals you for 50% of damage dealt. (Cost: ${this.manaCost} Mana)`;
    }

}

const siphonRanks: SpellRankData[] = [
    { rank: 0, cost: { type: Resource.Gold, amount: 0 }, manaCost: 0, spMod: 0 },
    { rank: 1, cost: { type: Resource.Gold, amount: 0 }, manaCost: 5, spMod: 2 },
    { rank: 2, cost: { type: Resource.Gold, amount: 0 }, manaCost: 5, spMod: 5 },
    { rank: 3, cost: { type: Resource.Gold, amount: 0 }, manaCost: 4, spMod: 10 },
    { rank: 4, cost: { type: Resource.Gold, amount: 0 }, manaCost: 4, spMod: 15 },
    { rank: 5, cost: { type: Resource.Gold, amount: 0 }, manaCost: 3, spMod: 15 },
];
