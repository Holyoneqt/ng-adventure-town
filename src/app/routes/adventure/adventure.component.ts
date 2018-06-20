import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { Enemy } from '../../game/models/entities/enemy.model';
import { Adventure } from './../../game/models/adventure.model';
import { Champion } from './../../game/models/entities/champion.model';
import { Spells } from './../../game/models/spells/spells.enum';
import { DataService } from './../../game/services/data.service';
import { SpellService } from './../../game/services/spell.service';
import { Spell } from '../../game/models/spells/spell.model';

  
@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.css']
})
export class AdventureComponent implements OnInit, OnDestroy {

  public adv: Adventure;

  public champ: Champion;
  public learnedSpells: Spell[];

  public enemy: Enemy;
  private enemyInterval: Subscription;

  constructor(private dataService: DataService, private spellService: SpellService) { }

  ngOnInit() {
    this.champ = this.dataService.getGame().champion;
    this.learnedSpells = this.spellService.getWhere(spell => spell.rank > 0);

    this.enemyInterval = new Subscription();
    console.log(this);
  }

  ngOnDestroy() {
    this.enemyInterval.unsubscribe();
  }

  public start(): void {
    this.adv = new Adventure();
    this.adv.start();
    this.enemy = this.adv.getCurrentEnemy();
    this.setEnemyIntervals();
  }

  public nextWave(): void {
    this.adv.currentWave++;
    this.enemy = this.adv.getCurrentEnemy();
    this.setEnemyIntervals();
  }

  public attack(): void {
    this.enemy.takeDamage(this.champ.physicalDamage.get());
  }

  public castSpell(spell: Spell): void {
    this.champ.castSpell(spell, this.enemy);
  }

  public enemyTurn(): void {
    this.champ.takeDamage(this.enemy.physicalDamage.get());
  }

  private setEnemyIntervals(): void {
    this.enemyInterval =
      interval(1000).subscribe(() => {
        this.enemyTurn();
      });

    this.enemy.onDeath.subscribe(() => {
      this.champ.gainExp(this.enemy.expReward);
      this.enemyInterval.unsubscribe();
    });
  }

}
