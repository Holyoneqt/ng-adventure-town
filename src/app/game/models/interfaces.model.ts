import { Item } from './items/item.model';
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

export interface StackedItem {
    item: Item;
    amount: number;
}

export interface SaveGame {
    game: {
        gold: number;
        wood: number;
        woodMax: number;
        stone: number;
        stoneMax: number;
        champion: {
            level: number;
            exp: number;
            expReq: number;
            expPercent: number;
            currentHealth: number;
            maxHealth: number;
            healthPercent: number;
            currentMana: number;
            maxMana: number;
            manaPercent: number;
            physicalDamage: number;
            spellDamage: number;
            stamina: number;
            strength: number;
            spellPower: number;
            baseHealth: number;
            baseDamage: number;
            skillPoints: number;
            items: { item: number, amount: number }[];
        }
    };
    buildings: {
        name: string;
        level: number;
    }[];
    spells: {
        name: string;
        rank: number;
    }[];
}

export const emptySaveGame: SaveGame = {
    game: {
        gold: 10,
        wood: 0,
        woodMax: 100,
        stone: 0,
        stoneMax: 100,
        champion: {
            level: 1,
            exp: 0,
            expReq: 100,
            expPercent: 0,
            currentHealth: 100,
            maxHealth: 100,
            healthPercent: 100,
            currentMana: 10,
            maxMana: 10,
            manaPercent: 100,
            physicalDamage: 3,
            spellDamage: 3,
            stamina: 0,
            strength: 0,
            spellPower: 0,
            baseHealth: 0,
            baseDamage: 0,
            skillPoints: 0,
            items: []
        }
    },
    buildings: [],
    spells: []
};
