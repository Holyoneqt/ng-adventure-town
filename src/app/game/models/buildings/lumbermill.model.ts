import { Game } from './../game.model';
import { Building } from './building.model';
import { Buildings } from './buildings.enum';
import { Resource } from '../resources.enum';
import { LumbermillConstants } from '../constants/buildings.constants';

export class Lumbermill extends Building {

    constructor(game: Game) {
        super(game, Buildings.Lumbermill, 'Produces Wood', 10);
        this.prices = LumbermillConstants.Prices;
        this.unlocked.set(true);
    }

    public onTick(): void {
        this.game.add(Resource.Wood, (this.level * 1));
    }

}
