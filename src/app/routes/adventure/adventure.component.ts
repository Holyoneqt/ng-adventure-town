import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { Adventure } from '../../game/models/adventures/adventure.model';
import { Enemy } from '../../game/models/entities/enemy.model';
import { Spell } from '../../game/models/spells/spell.model';
import { Champion } from './../../game/models/entities/champion.model';
import { Resource } from './../../game/models/resources.enum';
import { AdventureService } from './../../game/services/adventure.service';
import { DataService } from './../../game/services/data.service';
import { SpellService } from './../../game/services/spell.service';
import { MessageService, MessageType } from './../../services/message.service';


@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.css']
})
export class AdventureComponent implements OnInit, OnDestroy {

  public allAdventures: Adventure[];

  public currentAdventure: Adventure;
  public adventureFinished: boolean;

  public champ: Champion;
  public learnedSpells: Spell[];

  public enemy: Enemy;
  private enemyInterval: Subscription;

  constructor(private dataService: DataService, private messageService: MessageService, private adventureService: AdventureService, private spellService: SpellService) { }

  ngOnInit() {
    this.allAdventures = this.adventureService.getAll();
    this.champ = this.dataService.getGame().champion;
    this.learnedSpells = this.spellService.getWhere(spell => spell.rank > 0);

    this.enemyInterval = new Subscription();
  }

  ngOnDestroy() {
    this.enemyInterval.unsubscribe();
  }

  public start(adv: Adventure): void {
    this.currentAdventure = adv;
    this.adventureFinished = false;
    this.currentAdventure.start();
    this.enemy = this.currentAdventure.getCurrentEnemy();
    this.setEnemyIntervals();
  }

  public nextWave(): void {
    this.currentAdventure.currentWave++;
    this.enemy = this.currentAdventure.getCurrentEnemy();
    this.setEnemyIntervals();
  }

  public takeLoot(): void {
    this.dataService.getGame().add(Resource.Gold, 50);
    this.messageService.writeMessage(MessageType.Info, 'You looted:\n50 Gold, 20 Wood, 10 Stone, 1 Small Book and a large Coke Zero');
    this.currentAdventure.reset();
    this.currentAdventure = undefined;
    this.adventureFinished = false;
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
    const champDeathSub = this.champ.onDeath.subscribe(() => {
      this.enemyInterval.unsubscribe();
      champDeathSub.unsubscribe();
    });

    this.enemy.onDeath.subscribe(() => {
      this.champ.gainExp(this.enemy.expReward);
      if (this.currentAdventure.isLastWave()) {
        this.adventureFinished = true;
      }
      this.enemyInterval.unsubscribe();
      champDeathSub.unsubscribe();
    });

  }

}
