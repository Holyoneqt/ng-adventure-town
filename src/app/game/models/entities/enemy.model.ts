import { EntityConstants } from '../constants/entities.constants';
import { Entity } from './entity.model';

export class Enemy extends Entity {

    public expReward: number;

    constructor(minLvl: number, maxLvl: number) {
        super();
        this.attributes.name = EntityConstants.EnemyNames[Math.floor(Math.random() * EntityConstants.EnemyNames.length)];
        this.attributes.level = Math.floor(Math.floor(Math.random() * (maxLvl - minLvl + 1)) + minLvl);
        const lowLvl = (this.attributes.level - 6 < 0) ? 0 : (this.attributes.level - 8);
        const highLvl = this.attributes.level + 6;

        this.baseHealth = 10;
        this.baseDamage = 5;

        let rand = Math.floor(Math.floor(Math.random() * (highLvl - lowLvl + 1)) + lowLvl);
        const nextStamina = rand <= 0 ? 1 : rand;
        this.stamina$.next(nextStamina);
        
        rand = Math.floor(Math.floor(Math.random() * (highLvl - lowLvl + 1)) + lowLvl);
        const nextStrength = rand <= 0 ? 1 : rand;
        this.strength$.next(nextStrength);
    
        this.currentHealth$.next(this.attributes.maxHealth);

        // TODO: change dynamically
        this.expReward = 50;
    }


}
