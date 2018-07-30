import { ItemService } from '../../game/services/items.service';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { Adventure } from '../../game/models/adventures/adventure.model';
import { Enemy } from '../../game/models/entities/enemy.model';
import { Spell } from '../../game/models/spells/spell.model';
import { Champion } from '../../game/models/entities/champion.model';
import { Resource } from '../../game/models/resources.enum';
import { AdventureService } from '../../game/services/adventure.service';
import { DataService } from '../../game/services/data.service';
import { SpellService } from '../../game/services/spell.service';
import { MessageService, MessageType } from '../../services/message.service';
import { ItemType } from '../../game/models/items/item-type.enum';


@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.css']
})
export class AdventureComponent implements OnInit, AfterViewInit, OnDestroy {

  public allAdventures: Adventure[];

  public currentAdventure: Adventure;

  public champ: Champion;
  public learnedSpells: {keyId: number, spell: Spell}[];

  public enemy: Enemy;
  private enemyInterval: Subscription;

  public globalCooldown: number;
  private lastPressed: number;

  constructor(private dataService: DataService, private messageService: MessageService, private itemService: ItemService, private adventureService: AdventureService, private spellService: SpellService) { }

  ngOnInit() {
    this.allAdventures = this.adventureService.getAll();
    this.champ = this.dataService.getGame().champion;
    this.learnedSpells = [];

    let spellKeyId = 2; // Starts at 2 because Key '1' is reserved for Attack
    this.spellService.getWhere(spell => spell.rank > 0).forEach(s => {
      this.learnedSpells.push({ keyId: spellKeyId, spell: s });
      spellKeyId++;
    });

    this.globalCooldown = 250;
    this.lastPressed = 0;
    this.enemyInterval = new Subscription();
  }

  ngAfterViewInit() {
    this.initKeybinds();
  }

  ngOnDestroy() {
    this.enemyInterval.unsubscribe();
  }

  public start(adv: Adventure): void {
    this.currentAdventure = adv;
    this.currentAdventure.start();
    this.enemy = this.currentAdventure.getNextEnemy();
    this.setEnemyIntervals();
  }

  public nextEnemy(): void {
    this.enemy = this.currentAdventure.getNextEnemy();
    this.setEnemyIntervals();
  }

  public takeLoot(enemy: Enemy): void {
    this.dataService.getGame().add(Resource.Gold, enemy.goldReward);
    const loot = this.itemService.getRandom(ItemType.Junk, 3);
    this.champ.addItems(loot);
    let msg = `You looted: ${enemy.goldReward} Gold.`;
    loot.forEach(i => msg += ` ${i.item.name.get()} x${i.amount} |`);
    this.messageService.writeMessage(MessageType.Info, msg);
  }

  public castSpell(spell: Spell): void {
    this.champ.castSpell(spell, this.enemy);
  }

  public backToOverview(): void {
    this.currentAdventure = undefined;
    this.enemyInterval.unsubscribe();
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
      this.takeLoot(this.enemy);
      this.enemy = this.currentAdventure.getNextEnemy();
      this.enemyInterval.unsubscribe();
      this.setEnemyIntervals();
      // champDeathSub.unsubscribe();
    });

  }

  private initKeybinds(): void {
    window.onkeypress = (e) => {
      const now = Date.now();
      if (now - this.lastPressed > this.globalCooldown) {
        this.lastPressed = now;
        const button = document.getElementById(`keybind_${e.key}`);
        if (button) {
          button.click();
        }
      }
    };
  }

}
