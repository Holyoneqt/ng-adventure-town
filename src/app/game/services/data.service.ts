import { Injectable } from '@angular/core';

import { AdventureCollection } from '../collections/adventure.collection';
import { GemItemCollection, JunkItemCollection } from '../collections/item.collection';
import { Building } from '../models/buildings/building.model';
import { Lumbermill } from '../models/buildings/lumbermill.model';
import { Resource } from '../models/resources.enum';
import { FireSpell } from '../models/spells/fire.spell';
import { HealSpell } from '../models/spells/heal.spell';
import { Spell } from '../models/spells/spell.model';
import { Mine } from './../models/buildings/mine.model';
import { Warehouse } from './../models/buildings/warehouse.model';
import { Game } from './../models/game.model';
import { StackedItem } from './../models/interfaces.model';
import { SiphonSpell } from './../models/spells/siphon.spell';
import { ItemStacker } from './../util/item-stacker';
import { AdventureService } from './adventure.service';
import { BuildingService } from './building.service';
import { ItemService } from './items.service';
import { SpellService } from './spell.service';

@Injectable()
export class DataService {

    private readonly gameKey: string = 'game';
    private readonly buildingKey: string = 'buildings';
    private readonly spellsKey: string = 'spells';
    private game: Game;

    constructor(private itemService: ItemService, private adventureService: AdventureService, private buildingService: BuildingService, private spellService: SpellService) {
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
        let champItems = [];

        if (localGame === null) {
            this.game.add(Resource.Gold, 10);
        } else {
            const parsedGame = JSON.parse(localGame);
            console.log(parsedGame);
            this.initializeLoadedGame(parsedGame);
            champItems = JSON.parse(parsedGame.champion).items;
        }

        this.loadItems();
        this.initChampItems(champItems);
        this.loadAdventures();
        this.loadBuildings();
        this.loadSpells();
    }

    private loadItems(): void {
        this.itemService.import(JunkItemCollection, GemItemCollection);
    }

    private initChampItems(champItems: any[]): void {
        const stacker = new ItemStacker();
        const stack: StackedItem[] = [];
        champItems.forEach(i => {
            stack.push({ item: this.itemService.getById(i.item), amount: i.amount });
        });
        stacker.addItems(stack);
        this.game.champion.addItems(stacker.items.get());
    }

    private loadAdventures(): void {        
        this.adventureService.import(AdventureCollection);
    }

    private loadBuildings(): void {
        const buildingsLocal = localStorage.getItem(this.buildingKey);
        const buildingsSave = buildingsLocal !== null ? JSON.parse(buildingsLocal) : [];
        
        const buildings: Building[] = [];
        buildings.push(new Lumbermill(this.game));
        buildings.push(new Mine(this.game));
        buildings.push(new Warehouse(this.game));
        
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
        spells.push(new SiphonSpell(this.game));

        this.spellService.import(spells, spellsSave);
    }

    private saveSpells(): void {
        const spells = this.spellService.getAll();
        const save: { name: string, rank: number }[] = [];
        spells.forEach(s => save.push({name: s.name, rank: s.rank}));
        localStorage.setItem(this.spellsKey, JSON.stringify(save));
    }

    private initializeLoadedGame(localStorageValue: any) {
        this.game.importSave(localStorageValue);
    }

}
