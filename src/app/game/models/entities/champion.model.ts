import { NumberAttribute } from '../attributes/number-attribute.model';
import { interval, BehaviorSubject } from 'rxjs';

import { Entity } from './entity.model';

export class Champion extends Entity {

    public exp: NumberAttribute;
    public expReq: number;
    public expPercent: number;

    public skillPoints: NumberAttribute;

    constructor() {
        super();
        this.level.set(1);
        this.skillPoints = new NumberAttribute(0);
        this.level.subscribe(change => {
            if (change !== 1) {
                this.skillPoints.increase(1);
            }
        });

        this.exp = new NumberAttribute(0);
        this.exp.subscribe(e => this.onExpChange(e));
        this.expReq = 100;

        this.baseHealth = 50;
        this.baseDamage = 2;

        this.stamina.set(5);
        this.strength.set(4);
        this.spellPower.set(3);

        this.currentHealth.set(this.maxHealth.get());
        this.currentMana.set(this.maxMana.get());

        // Selfheal by 2% every second
        interval(1000).subscribe(() => {
            if (!this.isDead()) {
                this.heal(this.getPercentOf(this.maxHealth.get(), 2));
            }
        });
        // Mana-Reg: 1% every second
        interval(1000).subscribe(() => this.regenerateMana(this.getPercentOf(this.maxMana.get(), 1)));
    }

    private onExpChange(changeVal: number): void {
        this.expPercent = this.getPercent(this.expReq, changeVal);

        if (changeVal >= this.expReq) {
            this.levelUp();
        }
    }

    public gainExp(amount: number): void {
        this.exp.increase(amount);
    }

    public levelUp(): void {
        this.level.increase(1);
        this.stamina.increase(1);
        this.strength.increase(1);
        this.expReq = Math.round(100 + Math.pow((20 * (this.level.get() - 1)), 1.1));
        this.exp.set(0);
    }

    public importSave(save: any): Champion {
        save = JSON.parse(save);
        console.log(save);
        this.level.set(save.level);
        this.exp.set(save.exp);
        this.expReq = save.expReq;
        this.expPercent = save.expPercent;
        this.currentHealth.set(save.currentHealth);
        this.maxHealth.set(save.maxHealth);
        this.healthPercent = save.healthPercent;
        this.currentMana.set(save.currentMana);
        this.maxMana.set(save.maxMana);
        this.manaPercent = save.manaPercent;
        this.physicalDamage.set(save.physicalDamage);
        this.spellDamage.set(save.spellDamage);
        this.stamina.set(save.stamina);
        this.strength.set(save.strength);
        this.spellPower.set(save.spellPower);
        this.baseHealth = save.baseHealth;
        this.baseDamage = save.baseDamage;
        this.skillPoints.set(save.skillPoints);

        return this;
    }

    public exportSave(): string {
        return JSON.stringify({
            level: this.level.get(),
            exp: this.exp.get(),
            expReq: this.expReq,
            expPercent: this.expPercent,
            currentHealth: this.currentHealth.get(),
            maxHealth: this.maxHealth.get(),
            healthPercent: this.healthPercent,
            currentMana: this.currentMana.get(),
            maxMana: this.maxMana.get(),
            manaPercent: this.manaPercent,
            physicalDamage: this.physicalDamage.get(),
            spellDamage: this.spellDamage.get(),
            stamina: this.stamina.get(),
            strength: this.strength.get(),
            spellPower: this.spellPower.get(),
            baseHealth: this.baseHealth,
            baseDamage: this.baseDamage,
            skillPoints: this.skillPoints.get()
        });
    }

}
