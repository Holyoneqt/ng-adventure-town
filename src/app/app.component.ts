import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Champion } from './game/models/entities/champion.model';
import { Stat } from './game/models/entities/stats.enum';
import { Game } from './game/models/game.model';
import { DataService } from './game/services/data.service';
import { MessageService, MessageType } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private game: Game;
  private champ: Champion;

  constructor(private router: Router, private dataService: DataService, private messageService: MessageService) {
    this.initialize();
    this.initGlobalMessageEvents();
  }

  public routeTo(route: string): void {
    this.router.navigate([route]);
  }

  public saveGame(): void {
    this.dataService.saveGame();
    this.messageService.writeMessage(MessageType.Success, 'Game saved!');
  }

  private initialize(): void {
    this.dataService.loadData();
    this.game = this.dataService.getGame();
    this.champ = this.game.champion;
  }

  public initGlobalMessageEvents(): void {
    this.champ.level$.subscribe(l => this.messageService.writeMessage(MessageType.Success, `You reached Level ${l}!`));
    this.champ.onDeath.subscribe(() => this.messageService.writeMessage(MessageType.Error, 'You died!'));
  }

  incSta() {
    this.champ.increaseStat(Stat.Stamina, 1);
  }

}
