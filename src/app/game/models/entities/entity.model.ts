import { Subject } from 'rxjs';

import { EntityConstants } from './../constants/entities.constants';
import { Spell } from './../spells/spell.model';
import { Attribute } from './attributes/attribute.model';
import { NumberAttribute } from './attributes/number-attribute.model';
import { Stat } from './stats.enum';

export class Entity {

    public name: Attribute<string>;

    public level: NumberAttribute;
    public stamina: NumberAttribute;
    public strength: NumberAttribute;
    public spellPower: NumberAttribute;
    public currentHealth: NumberAttribute;
    public maxHealth: NumberAttribute;
    public currentMana: NumberAttribute;
    public maxMana: NumberAttribute;
    
    public physicalDamage: NumberAttribute;
    public spellDamage: NumberAttribute;

    public healthPercent: number;
    public manaPercent: number;

    public baseHealth: number;
    public baseDamage: number;

    public onDeath: Subject<boolean>;

    constructor() {
        this.name = new Attribute('');
        this.level = new NumberAttribute(1);
        this.stamina = new NumberAttribute(0);
        this.strength = new NumberAttribute(0);
        this.spellPower = new NumberAttribute(0);
        this.currentHealth = new NumberAttribute(0);
        this.maxHealth = new NumberAttribute(0);
        this.currentMana = new NumberAttribute(0);
        this.maxMana = new NumberAttribute(0);
        this.physicalDamage = new NumberAttribute(0);
        this.spellDamage = new NumberAttribute(0);

        this.onDeath = new Subject();

        this.level.subscribe(val => this.onLevelChange(val));
        this.stamina.subscribe(val => this.onStaminaChange(val));
        this.strength.subscribe(val => this.onStrengthChange(val));
        this.spellPower.subscribe(val => this.onSpellPowerChange(val));
        this.currentHealth.subscribe(val => this.onCurrentHealthChange(val));
        this.maxHealth.subscribe(val => this.onMaxHealthChange(val));
        this.currentMana.subscribe(val => this.onCurrentManaChange(val));
        this.maxMana.subscribe(val => this.onMaxManaChange(val));
    }

    protected onLevelChange(changeVal: number): void {
        this.maxMana.set(EntityConstants.BaseMana + changeVal);
    }

    protected onStaminaChange(changeVal: number): void {
        this.maxHealth.set(this.baseHealth + (changeVal * 10));
    }

    protected onStrengthChange(changeVal: number): void {
        this.physicalDamage.set(this.baseDamage + (changeVal * 1));
    }

    protected onSpellPowerChange(changeVal: number): void {
        this.spellDamage.set(changeVal * 3);
    }

    protected onCurrentHealthChange(changeVal: number): void {
        this.healthPercent = this.getPercent(this.maxHealth.get(), changeVal);
        if (this.isDead()) {
            this.onDeath.next();
        }
    }

    protected onMaxHealthChange(changeVal: number): void {
        this.healthPercent = this.getPercent(changeVal, this.currentHealth.get());
    }

    protected onCurrentManaChange(changeVal: number): void {
        this.manaPercent = this.getPercent(this.maxMana.get(), changeVal);
    }

    protected onMaxManaChange(changeVal: number): void { }

    public heal(amount: number): void {
        amount = amount <= 0 ? 1 : amount;
        let healedHealth = this.currentHealth.get() + amount;
        healedHealth = healedHealth > this.maxHealth.get() ? this.maxHealth.get() : healedHealth;
        this.currentHealth.set(healedHealth);
    }

    public regenerateMana(amount: number): void {
        amount = amount <= 0 ? 1 : amount;
        let reg = this.currentMana.get() + amount;
        reg = reg > this.maxMana.get() ? this.maxMana.get() : reg;
        this.currentMana.set(reg);
    }

    public takeDamage(amount: number): void {
        if (this.currentHealth.get() - amount < 0) {
            this.currentHealth.set(0);
        } else {
            this.currentHealth.decrease(amount);
        }
    }

    protected spendMana(amount: number): void {
        this.currentMana.decrease(amount);
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
                this.stamina.increase(amount);                
                break;
            case Stat.Strength:
                this.strength.increase(amount);   
                break;
            case Stat.SpellPower:
                this.spellPower.increase(amount);
                break;
        }
    }

    public manaAvailable(amount: number): boolean {
        return this.currentMana.get() >= amount;
    }

    protected isDead(): boolean {
        return this.currentHealth.get() <= 0;
    }

    protected getPercent(max: number, unkown: number) {
        return Math.round((100 * unkown) / max);
    }

    protected getPercentOf(value: number, percent: number): number {
        return Math.round((percent * value) / 100);
    }

}
