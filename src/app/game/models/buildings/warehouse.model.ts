import { Game } from './../game.model';
import { Building } from './building.model';
import { Buildings } from './buildings.enum';
import { Resource } from '../resources.enum';
import { LumbermillConstants } from '../constants/buildings.constants';

export class Warehouse extends Building {

    constructor(game: Game) {
        super(game, Buildings.Warehouse, 'Increases the amount of Resources you can store.', 20);
        this.prices = LumbermillConstants.Prices;

        const unlockSub = this.game.wood.subscribe(newVal => {
            if (newVal >= 2) {
                this.unlocked = true;
                unlockSub.unsubscribe();
            }
        });
    }

    public onLevelUp(): void {
        this.game.woodMax.increase(20);
        this.game.stoneMax.increase(20);
    }

}
