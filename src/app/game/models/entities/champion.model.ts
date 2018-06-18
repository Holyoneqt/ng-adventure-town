import { interval, BehaviorSubject } from 'rxjs';

import { Entity } from './entity.model';

export class Champion extends Entity {

    public exp$: BehaviorSubject<number>;
    public exp: number;
    public expReq: number;
    public expPercent: number;

    constructor() {
        super();
        this.level$.next(1);
        this.exp$ = new BehaviorSubject(0);
        this.exp$.subscribe(e => this.onExpChange(e));
        this.expReq = 100;

        this.baseHealth = 50;
        this.baseDamage = 2;

        this.stamina$.next(5);
        this.strength$.next(4);
        this.spellPower$.next(3);

        this.heal(this.getPercent(this.attributes.maxHealth, 100));

        // Selfheal by 2% every second
        interval(1000).subscribe(() => this.heal(this.getPercentOf(this.attributes.maxHealth, 2)));
        // Mana-Reg: 1% every second
        interval(1000).subscribe(() => this.regenerateMana(this.getPercentOf(this.attributes.maxMana, 1)));
    }

    public gainExp(amount: number): void {
        this.exp += amount;
        this.exp$.next(this.exp);
    }

    public levelUp(): void {
        this.level$.next(this.attributes.level + 1);
        this.expReq *= 1.5;
        this.exp$.next(0);
    }

    private onExpChange(changeVal: number): void {
        this.exp = changeVal;
        this.expPercent = this.getPercent(this.expReq, this.exp);

        if (this.exp >= this.expReq) {
            this.levelUp();
        }
    }

    public importSave(save: any): Champion {
        save = JSON.parse(save);
        console.log(save);
        this.level$.next(save.level);
        this.exp = save.exp;
        this.expReq = save.expReq;
        this.expPercent = save.expPercent;
        this.currentHealth$.next(save.currentHealth);
        this.maxHealth$.next(save.maxHealth);
        this.healthPercent = save.healthPercent;
        this.currentMana$.next(save.currentMana);
        this.maxMana$.next(save.maxMana);
        this.manaPercent = save.manaPercent;
        this.attributes.physicalDamage = save.damage;
        this.stamina$.next(save.stamina);
        this.strength$.next(save.strength);
        this.spellPower$.next(save.spellPower);
        this.baseHealth = save.baseHealth;
        this.baseDamage = save.baseStrength;

        return this;
    }

    public exportSave(): string {
        return JSON.stringify({
            level: this.attributes.level,
            exp: this.exp,
            expReq: this.expReq,
            expPercent: this.expPercent,
            currentHealth: this.attributes.currentHealth,
            maxHealth: this.attributes.maxHealth,
            healthPercent: this.healthPercent,
            currentMana: this.attributes.currentMana,
            maxMana: this.attributes.maxMana,
            manaPercent: this.manaPercent,
            damage: this.attributes.physicalDamage,
            stamina: this.attributes.stamina,
            strength: this.attributes.strength,
            spellPower: this.attributes.spellPower,
            baseHealth: this.baseHealth,
            baseDamage: this.baseDamage
        });
    }

}
