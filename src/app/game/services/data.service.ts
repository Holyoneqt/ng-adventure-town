import { Champion } from '../models/entities/champion.model';
import { Injectable } from '@angular/core';

import { Lumbermill } from '../models/buildings/lumbermill.model';
import { Building } from './../models/building.model';
import { Mine } from './../models/buildings/mine.model';
import { Game } from './../models/game.model';
import { BuildingService } from './building.service';
import { Resource } from '../models/resources.enum';

@Injectable()
export class DataService {

    private readonly gameKey: string = 'game';
    private readonly buildingKey: string = 'buildings';
    private game: Game;

    constructor(private buildingService: BuildingService) {
    }

    public getGame(): Game {
        return this.game;
    }

    public saveGame(): void {
        localStorage.setItem(this.gameKey, this.game.exportSave());
        this.saveBuildings();
    }

    public loadData(): void {
        this.game = new Game();
        const localGame: any = localStorage.getItem(this.gameKey);
        
        if (localGame === null) {
            this.game.add(Resource.Gold, 10);
        } else {
            this.initializeLoadedGame(JSON.parse(localGame));
        }

        const buildingsLocal = localStorage.getItem(this.buildingKey);
        const buildingsSave = buildingsLocal !== null ? JSON.parse(buildingsLocal) : [];
        const buildings: Building[] = [];
        buildings.push(new Lumbermill(this.game));
        buildings.push(new Mine(this.game));
        this.buildingService.initialize(buildings, buildingsSave);
    }

    private saveBuildings(): void {
        const buildings = this.buildingService.getAll();
        const save: { name: string, level: number }[] = [];
        buildings.forEach(b => save.push({ name: b.name, level: b.level }));
        localStorage.setItem(this.buildingKey, JSON.stringify(save));
    }

    private initializeLoadedGame(localStorageValue: any) {
        console.log(localStorageValue);
        console.log(localStorageValue.champion);
        console.log(this.game.champion);
        this.game.importSave(localStorageValue);
    }

}
