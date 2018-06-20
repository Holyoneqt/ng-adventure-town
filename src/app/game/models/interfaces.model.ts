import { Resource } from './resources.enum';

export interface Price {
    type: Resource;
    amount: number;
}

export interface SpellRankData {
    rank: number;
    cost: Price;
    manaCost: number;
    spMod: number;
}
