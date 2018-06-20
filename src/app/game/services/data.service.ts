import { Injectable } from '@angular/core';

import { Lumbermill } from '../models/buildings/lumbermill.model';
import { Resource } from '../models/resources.enum';
import { FireSpell } from '../models/spells/fire.spell';
import { HealSpell } from '../models/spells/heal.spell';
import { Spell } from '../models/spells/spell.model';
import { Building } from './../models/building.model';
import { Mine } from './../models/buildings/mine.model';
import { Game } from './../models/game.model';
import { BuildingService } from './building.service';
import { SpellService } from './spell.service';

@Injectable()
export class DataService {

    private readonly gameKey: string = 'game';
    private readonly buildingKey: string = 'buildings';
    private readonly spellsKey: string = 'spells';
    private game: Game;

    constructor(private buildingService: BuildingService, private spellService: SpellService) {
    }

    public getGame(): Game {
        return this.game;
    }

    public saveGame(): void {
        localStorage.setItem(this.gameKey, this.game.exportSave());
        this.saveBuildings();
        this.saveSpells();
    }

    public loadData(): void {
        this.game = new Game();
        const localGame: any = localStorage.getItem(this.gameKey);
        
        if (localGame === null) {
            this.game.add(Resource.Gold, 10);
        } else {
            this.initializeLoadedGame(JSON.parse(localGame));
        }

        this.loadBuildings();
        this.loadSpells();
    }

    private loadBuildings(): void {
        const buildingsLocal = localStorage.getItem(this.buildingKey);
        const buildingsSave = buildingsLocal !== null ? JSON.parse(buildingsLocal) : [];
        
        const buildings: Building[] = [];
        buildings.push(new Lumbermill(this.game));
        buildings.push(new Mine(this.game));
        
        this.buildingService.import(buildings, buildingsSave);
    }

    private saveBuildings(): void {
        const buildings = this.buildingService.getAll();
        const save: { name: string, level: number }[] = [];
        buildings.forEach(b => save.push({ name: b.name, level: b.level }));
        localStorage.setItem(this.buildingKey, JSON.stringify(save));
    }

    private loadSpells(): void {
        const spellsLocal = localStorage.getItem(this.spellsKey);
        const spellsSave = spellsLocal !== null ? JSON.parse(spellsLocal) : [];

        const spells: Spell[] = [];
        spells.push(new HealSpell(this.game));
        spells.push(new FireSpell(this.game));   

        this.spellService.import(spells, spellsSave);
    }

    private saveSpells(): void {
        const spells = this.spellService.getAll();
        const save: { name: string, rank: number }[] = [];
        spells.forEach(s => save.push({name: s.name, rank: s.rank}));
        localStorage.setItem(this.spellsKey, JSON.stringify(save));
    }

    private initializeLoadedGame(localStorageValue: any) {
        console.log(localStorageValue);
        console.log(localStorageValue.champion);
        console.log(this.game.champion);
        this.game.importSave(localStorageValue);
    }

}
