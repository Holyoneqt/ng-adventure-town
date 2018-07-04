import { Building } from './building.model';
import { Buildings } from './../buildings/buildings.enum';
import { Game } from './../game.model';
import { Resource } from '../resources.enum';

export class Mine extends Building {

    constructor(game: Game) {
        super(game, Buildings.Mine, 'Produces Stone', 25);
        this.prices = [ 
            [ { type: Resource.Gold, amount: 5 }, { type: Resource.Wood, amount: 5 } ],
            [ { type: Resource.Gold, amount: 15 }, { type: Resource.Gold, amount: 10 } ],
            [ { type: Resource.Gold, amount: 25 }, { type: Resource.Gold, amount: 30 } ],
        ];
        this.unlocked = true;
    }

    public onTick(): void {
        this.game.add(Resource.Stone, (this.level * 1));
    }

}
