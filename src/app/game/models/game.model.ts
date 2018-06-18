import { Resource } from './resources.enum';
import { Champion } from './entities/champion.model';

export class Game {

    private gold: number;
    private wood: number;
    private stone: number;

    public champion: Champion;

    constructor() {
        this.gold = 0;
        this.wood = 0;
        this.stone = 0;

        this.champion = new Champion();
    }

    public get(resource: Resource): number {
        switch (resource) {
            case Resource.Gold: return this.gold;
            case Resource.Wood: return this.wood;
            case Resource.Stone: return this.stone;
        }
    }

    public add(resource: Resource, amount: number): number {
        switch (resource) {
            case Resource.Gold: return (this.gold += amount);
            case Resource.Wood: return (this.wood += amount);
            case Resource.Stone: return (this.stone += amount);
        }
    }

    public remove(resource: Resource, amount: number): boolean {
        if (this.get(resource) - amount < 0) {
            return false;
        } else {
            this.add(resource, -amount);
            return true;
        }
    }

    public resourceAvailable(resource: Resource, amount: number): boolean {
        return this.get(resource) - amount >= 0;
    }

    public importSave(save: any): Game {
        this.gold = save.gold;
        this.wood = save.wood;
        this.stone = save.stone;
        this.champion = new Champion().importSave(save.champion);

        return this;
    }

    public exportSave(): string {
        return JSON.stringify({
            gold: this.gold,
            wood: this.wood,
            stone: this.stone,
            champion: this.champion.exportSave()
        });
    }

}
