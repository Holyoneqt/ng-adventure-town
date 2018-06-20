import { Entity } from './../entities/entity.model';
import { Game } from './../game.model';
import { SpellRankData } from './../interfaces.model';

export abstract class Spell {

    protected game: Game;

    public name: string;
    public description: string;

    public rank: number;
    public manaCost: number;

    public icon: string;
    public color: string;

    protected spMod: number;

    constructor(game: Game) {
        this.game = game;
    }

    public cast(c: Entity, t?: Entity): void {} 
    
    public increaseRank(): boolean {
        const cost = this.getNextSpellRankData().cost;
        console.log(cost);
        if (this.game.resourceAvailable(cost.type, cost.amount)) {
            this.game.remove(cost.type, cost.amount);
            this.rank++;
            this.loadRank(this.rank);
            return true;
        } else {
            return false;
        }
    }

    public getNextSpellRankData(): SpellRankData {
        return undefined;
    }
    
    public loadRank(rank: number): void {}

}
