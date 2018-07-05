import { EntityConstants } from '../constants/entities.constants';
import { Entity } from './entity.model';

export class Enemy extends Entity {

    public expReward: number;
    public goldReward: number;

    constructor(minLvl: number, maxLvl: number) {
        super();
        this.name.set(EntityConstants.EnemyNames[Math.floor(Math.random() * EntityConstants.EnemyNames.length)]);
        this.level.set(Math.floor(Math.floor(Math.random() * (maxLvl - minLvl + 1)) + minLvl));
        const lowLvl = (this.level.get() - 6 < 0) ? 0 : (this.level.get() - 8);
        const highLvl = this.level.get() + 6;

        this.baseHealth = 10;
        this.baseDamage = 5;

        let rand = Math.floor(Math.floor(Math.random() * (highLvl - lowLvl + 1)) + lowLvl);
        const nextStamina = rand <= 0 ? 1 : rand;
        this.stamina.set(nextStamina);
        
        rand = Math.floor(Math.floor(Math.random() * (highLvl - lowLvl + 1)) + lowLvl);
        const nextStrength = rand <= 0 ? 1 : rand;
        this.strength.set(nextStrength);
    
        this.currentHealth.set(this.maxHealth.get());

        this.expReward = Math.round(10 + Math.pow((this.level.get() * 1.5), 1.25));
        this.goldReward = Math.floor(this.level.get() + (Math.round(Math.random() * this.level.get())));
    }

}
