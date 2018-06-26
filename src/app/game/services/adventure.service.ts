import { Injectable } from '@angular/core';

import { Adventure } from './../models/adventures/adventure.model';
import { Adventures } from './../models/adventures/adventures.enum';

@Injectable()
export class AdventureService {

    private adventures: Adventure[];
    
    constructor() {}

    public getAll(): Adventure[] {
        return this.adventures;
    }

    public get(adventure: Adventures): Adventure {
        return this.adventures.find(a => a.name === adventure);
    }

    public import(adventures: Adventure[]): void {
        this.adventures = adventures;
    }

}
