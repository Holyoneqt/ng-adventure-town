import { NumberAttribute } from './attributes/number.attribute';
import { Champion } from './entities/champion.model';
import { SaveGame } from './interfaces.model';
import { Resource } from './resources.enum';

export class Game {

    public gold: NumberAttribute;
    
    public wood: NumberAttribute;
    public woodMax: NumberAttribute;

    public stone: NumberAttribute;
    public stoneMax: NumberAttribute;

    public champion: Champion;

    constructor() {
        this.gold = new NumberAttribute(0);
        this.wood = new NumberAttribute(0);
        this.woodMax = new NumberAttribute(100);
        this.stone = new NumberAttribute(0);
        this.stoneMax = new NumberAttribute(100);

        this.champion = new Champion();
    }

    public get(resource: Resource): number {
        switch (resource) {
            case Resource.Gold: return this.gold.get();
            case Resource.Wood: return this.wood.get();
            case Resource.Stone: return this.stone.get();
        }
    }

    public add(resource: Resource, amount: number): void {
        switch (resource) {
            case Resource.Gold: (this.gold.increase(amount)); 
                break;
            case Resource.Wood: (this.wood.get() + amount <= this.woodMax.get()) ? this.wood.increase(amount) : this.wood.set(this.woodMax.get());
                break;
            case Resource.Stone: (this.stone.get() + amount <= this.stoneMax.get()) ? this.stone.increase(amount) : this.stone.set(this.stoneMax.get());
                break;
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

    public importSave(save: SaveGame): Game {
        this.gold.set(save.game.gold);
        this.wood.set(save.game.wood);
        this.woodMax.set(save.game.woodMax);
        this.stone.set(save.game.stone);
        this.stoneMax.set(save.game.stoneMax);
        this.champion = new Champion().importSave(save.game.champion);

        return this;
    }

    public exportSave(): any {
        return ({
            gold: this.gold.get(),
            wood: this.wood.get(),
            woodMax: this.woodMax.get(),
            stone: this.stone.get(),
            stoneMax: this.stoneMax.get(),
            champion: this.champion.exportSave()
        });
    }

}
