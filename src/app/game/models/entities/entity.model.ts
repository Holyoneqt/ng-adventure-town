import { BehaviorSubject, Subject } from 'rxjs';

import { EntityConstants } from './../constants/entities.constants';
import { Spell } from './../spells/spell.model';
import { Stat } from './stats.enum';

interface EntityAttributes {
    name: string;
    level: number;
    
    stamina: number;
    strength: number;
    spellPower: number;

    currentMana: number;
    maxMana: number;

    currentHealth: number;
    maxHealth: number;

    physicalDamage: number;
    spellDamage: number;
}

const emptyEntityAttributes: EntityAttributes = {
    name: '',
    level: 0,
    stamina: 0,
    strength: 0,
    spellPower: 0,
    currentMana: 0,
    maxMana: 0,
    currentHealth: 0,
    maxHealth: 0,
    physicalDamage: 0,
    spellDamage: 0
};

export class Entity {

    public attributes: EntityAttributes;

    public level$: BehaviorSubject<number>;
    public stamina$: BehaviorSubject<number>;
    public strength$: BehaviorSubject<number>;
    public spellPower$: BehaviorSubject<number>;
    public currentHealth$: BehaviorSubject<number>;
    public maxHealth$: BehaviorSubject<number>;
    public currentMana$: BehaviorSubject<number>;
    public maxMana$: BehaviorSubject<number>;
    
    public healthPercent: number;
    public manaPercent: number;

    public baseHealth: number;
    public baseDamage: number;

    public onDeath: Subject<boolean>;

    constructor() {
        this.attributes = { ...emptyEntityAttributes };

        this.level$ = new BehaviorSubject(1);
        this.stamina$ = new BehaviorSubject(0);
        this.strength$ = new BehaviorSubject(0);
        this.spellPower$ = new BehaviorSubject(0);
        this.currentHealth$ = new BehaviorSubject(0);
        this.maxHealth$ = new BehaviorSubject(0);
        this.currentMana$ = new BehaviorSubject(0);
        this.maxMana$ = new BehaviorSubject(0);
        this.onDeath = new Subject();

        this.level$.subscribe(val => this.onLevelChange(val));
        this.stamina$.subscribe(val => this.onStaminaChange(val));
        this.strength$.subscribe(val => this.onStrengthChange(val));
        this.spellPower$.subscribe(val => this.onSpellPowerChange(val));
        this.currentHealth$.subscribe(val => this.onCurrentHealthChange(val));
        this.maxHealth$.subscribe(val => this.onMaxHealthChange(val));
        this.currentMana$.subscribe(val => this.onCurrentManaChange(val));
        this.maxMana$.subscribe(val => this.onMaxManaChange(val));
    }

    protected onLevelChange(changeVal: number): void {
        this.attributes.level = changeVal;
        this.attributes.maxMana = EntityConstants.ManaValues[changeVal - 1];
        this.currentMana$.next(this.attributes.maxMana);
    }

    protected onStaminaChange(changeVal: number): void {
        this.attributes.stamina = changeVal;
        this.attributes.maxHealth = this.baseHealth + (changeVal * 10);
        this.currentHealth$.next(this.attributes.currentHealth ? this.attributes.currentHealth : 0);
    }

    protected onStrengthChange(changeVal: number): void {
        this.attributes.strength = changeVal;
        this.attributes.physicalDamage = this.baseDamage + (changeVal * 1);
    }

    protected onSpellPowerChange(changeVal: number): void {
        this.attributes.spellPower = changeVal;
        this.attributes.spellDamage = this.attributes.spellPower * 5;
    }

    protected onCurrentHealthChange(changeVal: number): void {
        this.attributes.currentHealth = changeVal;
        this.healthPercent = this.getPercent(this.attributes.maxHealth, this.attributes.currentHealth);
        if (this.isDead()) {
            this.onDeath.next();
        }
    }

    protected onMaxHealthChange(changeVal: number): void {
        this.attributes.maxHealth = changeVal;
    }

    protected onCurrentManaChange(changeVal: number): void {
        this.attributes.currentMana = changeVal;
        this.manaPercent = this.getPercent(this.attributes.maxMana, this.attributes.currentMana);
    }

    protected onMaxManaChange(changeVal: number): void {
        this.attributes.maxMana = changeVal;
    }

    public heal(amount: number): void {
        amount = amount <= 0 ? 1 : amount;
        let healedHealth = this.attributes.currentHealth += amount;
        healedHealth = healedHealth > this.attributes.maxHealth ? this.attributes.maxHealth : healedHealth;
        this.currentHealth$.next(healedHealth);
    }

    public regenerateMana(amount: number): void {
        amount = amount <= 0 ? 1 : amount;
        let reg = this.attributes.currentMana += amount;
        reg = reg > this.attributes.maxMana ? this.attributes.maxMana : reg;
        this.currentMana$.next(reg);
    }

    public takeDamage(amount: number): void {
        this.currentHealth$.next(this.attributes.currentHealth -= amount);
    }

    protected spendMana(amount: number): void {
        const newManaPool = this.attributes.currentMana -= amount;
        this.currentMana$.next(newManaPool);
    }

    public castSpell(spell: Spell, target?: Entity) {
        if (this.manaAvailable(spell.manaCost)) {
            console.log('Casting Spell', spell.name, 'on', target);
            this.spendMana(spell.manaCost);
            spell.cast(this, target);
        }
    }

    public increaseStat(stat: Stat, amount: number): void {
        switch (stat) {
            case Stat.Stamina:
                this.attributes.stamina += amount;
                this.stamina$.next(this.attributes.stamina);                
                break;
            case Stat.Strength:
                this.attributes.strength += amount;
                this.strength$.next(this.attributes.strength);   
                break;
        }
    }

    public manaAvailable(amount: number): boolean {
        return this.attributes.currentMana >= amount;
    }

    private isDead(): boolean {
        return this.attributes.currentHealth <= 0;
    }

    protected getPercent(max: number, unkown: number) {
        return Math.round((100 * unkown) / max);
    }

    protected getPercentOf(value: number, percent: number): number {
        return Math.round((percent * value) / 100);
    }

}
