import { Price } from './interfaces.model';
import { interval } from 'rxjs';

import { TickDuration } from '../models/constants/constants';
import { Game } from './game.model';
import { Resource } from './resources.enum';


export class Building {

    protected game: Game;

    public name: string;
    public description: string;

    public level: number;
    public maxLevel: number;

    protected priceType: Resource;
    protected prices: Price[][];

    constructor(game: Game, name: string, desc: string, maxLevel: number) {
        this.game = game;
        this.name = name;
        this.description = desc;

        this.level = 0;
        this.maxLevel = maxLevel;

        this.prices = [];

        interval(TickDuration).subscribe(() => this.onTick());
    }

    public levelUp(): boolean {
        for (let i = 0; i < this.getPriceInfo().length; i++) {
            if (!this.game.resourceAvailable(this.getPriceInfo()[i].type, this.getPriceInfo()[i].amount)) {
                return false;
            }
        }

        for (let i = 0; i < this.getPriceInfo().length; i++) {
            this.game.remove(this.getPriceInfo()[i].type, this.getPriceInfo()[i].amount);
        }
        this.level++;
        return true;
    }

    public getPriceInfo(): { type: Resource, amount: number }[] {
        return this.prices[this.level];
    }

    public isMaxLevel(): boolean {
        return this.level >= this.maxLevel;
    }

    public onTick(): void { }

}
