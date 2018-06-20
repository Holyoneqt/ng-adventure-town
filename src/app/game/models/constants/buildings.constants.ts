import { Price } from './../interfaces.model';
import { Resource } from './../resources.enum';

export class LumbermillConstants {

    public static Prices: Price[][] = [ 
        [ { type: Resource.Gold, amount: 5 } ],
        [ { type: Resource.Gold, amount: 8 } ],
        [ { type: Resource.Gold, amount: 10 } ],
        [ { type: Resource.Gold, amount: 25 } ],
        [ { type: Resource.Gold, amount: 50 } ],
        [ { type: Resource.Gold, amount: 100 }, { type: Resource.Stone, amount: 25 } ],
        [ { type: Resource.Gold, amount: 400 }, { type: Resource.Stone, amount: 100 } ],
        [ { type: Resource.Gold, amount: 1000 }, { type: Resource.Stone, amount: 250 } ],
        [ { type: Resource.Gold, amount: 2500 }, { type: Resource.Stone, amount: 500 } ],
        [ { type: Resource.Gold, amount: 5000 }, { type: Resource.Stone, amount: 1000 } ],
    ];

}
