import { Injectable } from '@angular/core';

import { Spell } from '../models/spells/spell.model';
import { Spells } from '../models/spells/spells.enum';

@Injectable()
export class SpellService {

    private spells: Spell[];
    
    constructor() {}

    public getAll(): Spell[] {
        return this.spells;
    }

    public getWhere(func: (spell: Spell) => boolean): Spell[] {
        return this.spells.filter(func);
    }

    public get(spell: Spells): Spell {
        return this.spells.find(s => s.name === spell);
    }

    public import(spells: Spell[], save: { name, rank }[]): void {
        this.spells = spells;
        this.spells.forEach(s => {
            const found = save.find(saveFind => saveFind.name === s.name);
            if (found) {
                s.loadRank(found.rank);
            } else {
                s.loadRank(s.rank);
            }
        });
    }

}
