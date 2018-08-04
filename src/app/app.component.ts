import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Champion } from './game/models/entities/champion.model';
import { Stat } from './game/models/entities/stats.enum';
import { Game } from './game/models/game.model';
import { Resource } from './game/models/resources.enum';
import { DataService } from './game/services/data.service';
import { MessageService, MessageType } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public game: Game;
  public resourceGold: Resource;
  public resourceWood: Resource;
  public resourceStone: Resource;

  public champ: Champion;
  public skillPointAvailable: boolean; 

  constructor(private router: Router, private dataService: DataService, private messageService: MessageService) {
    this.initialize();
    this.initGlobalMessageEvents();
  }

  ngOnInit() {
    this.champ.skillPoints.subscribe(change => this.skillPointAvailable = (change > 0));
    this.resourceGold = Resource.Gold;
    this.resourceWood = Resource.Wood;
    this.resourceStone = Resource.Stone;
  }

  public increaseStat(stat: Stat): void {
    this.champ.increaseStat(stat, 1);
    this.champ.skillPoints.decrease(1);
  }

  public routeTo(route: string): void {
    this.router.navigate([route]);
  }

  public saveGame(): void {
    this.dataService.saveGame();
    this.messageService.writeMessage(MessageType.Success, 'Game saved!');
  }

  private initialize(): void {
    this.game = this.dataService.game;
    this.champ = this.game.champion;
  }

  public initGlobalMessageEvents(): void {
    this.champ.level.subscribe(l => this.messageService.writeMessage(MessageType.Success, `You reached Level ${l}!`));
    this.champ.onDeath.subscribe(() => this.messageService.writeMessage(MessageType.Error, 'You died!'));
  }



  public healFull(): void {
    this.champ.heal(10000000);
  }

}
