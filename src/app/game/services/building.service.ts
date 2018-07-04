import { Injectable } from '@angular/core';

import { Building } from './../models/buildings/building.model';
import { Buildings } from './../models/buildings/buildings.enum';

@Injectable()
export class BuildingService {

    private buildings: Building[];
    
    constructor() {}

    public getAll(): Building[] {
        return this.buildings;
    }

    public getWhere(func: (building: Building) => boolean): Building[] {
        return this.buildings.filter(func);
    }

    public get(building: Buildings): Building {
        return this.buildings.find(b => b.name === building);
    }


    public import(buildings: Building[], save: { name, level }[]): void {
        this.buildings = buildings;
        this.buildings.forEach(b => {
            const found = save.find(s => s.name === b.name);
            b.level = found ? found.level : b.level;
        });
    }

}
