import { Entity } from './../entities/entity.model';
import { Spell } from './spell.model';

export class Heal implements Spell {
    
    public name: string;
    public rank: number;
    public cost: number;

    constructor() {
        this.name = 'Heal';
        this.rank = 1;
        this.cost = 4;
    }
    
    public cast(caster: Entity, target?: Entity): void {
        target = (target) ? target : caster; // Check if Target is available, else its a selfcast
        if (caster.manaAvailable(this.cost)) {
            target.heal(caster.attributes.spellPower * 5);
        }
    }

}
