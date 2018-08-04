import { Injectable } from '@angular/core';

import { AdventureCollection } from '../collections/adventure.collection';
import { GemItemCollection, JunkItemCollection } from '../collections/item.collection';
import { Building } from '../models/buildings/building.model';
import { Lumbermill } from '../models/buildings/lumbermill.model';
import { Mine } from '../models/buildings/mine.model';
import { Warehouse } from '../models/buildings/warehouse.model';
import { Game } from '../models/game.model';
import { StackedItem } from '../models/interfaces.model';
import { FireSpell } from '../models/spells/fire.spell';
import { HealSpell } from '../models/spells/heal.spell';
import { SiphonSpell } from '../models/spells/siphon.spell';
import { Spell } from '../models/spells/spell.model';
import { ItemStacker } from '../util/item-stacker';
import { CraftingItemCollection } from './../collections/item.collection';
import { emptySaveGame, SaveGame } from './../models/interfaces.model';
import { Resource } from './../models/resources.enum';
import { Attack } from './../models/spells/attack.spell';
import { AdventureService } from './adventure.service';
import { BuildingService } from './building.service';
import { ItemService } from './items.service';
import { SpellService } from './spell.service';

@Injectable()
export class DataService {

    private readonly saveGameKey: string = 'ng-adventure-town-save';
    public game: Game;

    constructor(public items: ItemService, public adventures: AdventureService, public buildings: BuildingService, public spells: SpellService) {
        this.game = new Game();
        const savedGame = localStorage.getItem(this.saveGameKey);
        if (savedGame === null) {
            this.loadData(emptySaveGame);
            this.game.add(Resource.Gold, 10);
        } else {
            this.loadData(JSON.parse(savedGame));
        }
    }

    public saveGame(): void {
        const saveGameData: SaveGame = {
            game: this.game.exportSave(),
            buildings: this.exportBuildingsSave(),
            spells: this.exportSpellsSave()
        };

        localStorage.setItem(this.saveGameKey, JSON.stringify(saveGameData));
    }

    public loadData(saveGameData: SaveGame): void {
        this.loadGame(saveGameData);
        this.loadItemsFromCollection();
        this.loadChampionItems(saveGameData);
        this.loadAdventuresFromCollection();
        this.loadBuildings(saveGameData);
        this.loadSpells(saveGameData);

    }

    private loadGame(saveGameData: SaveGame): void {
        this.game.importSave(saveGameData);
    }

    private loadItemsFromCollection(): void {
        this.items.import(JunkItemCollection, GemItemCollection, CraftingItemCollection);
    }

    private loadChampionItems(saveGameData: SaveGame): void {
        const stacker = new ItemStacker();
        const stack: StackedItem[] = [];
        saveGameData.game.champion.items.forEach(i => {
            stack.push({ item: this.items.getById(i.item), amount: i.amount });
        });
        stacker.addItems(stack);
        this.game.champion.addItems(stacker.items.get());
    }

    private loadAdventuresFromCollection(): void {        
        this.adventures.import(AdventureCollection);
    }

    private loadBuildings(saveGameData: SaveGame): void {        
        const buildings: Building[] = [];
        buildings.push(new Lumbermill(this.game));
        buildings.push(new Mine(this.game));
        buildings.push(new Warehouse(this.game));
        
        this.buildings.import(buildings, saveGameData.buildings);
    }

    private exportBuildingsSave(): { name: string, level: number }[] {
        const buildings = this.buildings.getAll();
        const save: { name: string, level: number }[] = [];
        buildings.forEach(b => save.push({ name: b.name, level: b.level }));
        return save;
    }

    private loadSpells(saveGameData: SaveGame): void {
        const spells: Spell[] = [];
        spells.push(new Attack(this.game));
        spells.push(new HealSpell(this.game));
        spells.push(new FireSpell(this.game));   
        spells.push(new SiphonSpell(this.game));

        this.spells.import(spells, saveGameData.spells);
    }

    private exportSpellsSave(): { name: string, rank: number }[] {
        const spells = this.spells.getAll();
        const save: { name: string, rank: number }[] = [];
        spells.forEach(s => save.push({name: s.name, rank: s.rank}));
        return save;
    }

}
