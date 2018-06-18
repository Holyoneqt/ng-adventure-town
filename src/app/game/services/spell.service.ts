import { Injectable } from '@angular/core';

import { Building } from './../models/building.model';
import { Buildings } from './../models/buildings/buildings.enum';
import { Spell } from '../models/spells/spell.model';

@Injectable()
export class SpellService {

    private spells: Spell[];
    
    constructor() {}

    public getAll(): Spell[] {
        return this.spells;
    }

    public get(spell: Spell): Spell {
        return this.spells.find(s => s.name === spell.name);
    }

    // public import(spells: Building[], save: { name, level }[]): void {
    //     this.spells = buildings;
    //     this.spells.forEach(b => {
    //         const found = save.find(s => s.name === b.name);
    //         b.level = found ? found.level : b.level;
    //     });
    // }

}
