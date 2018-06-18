import { Champion } from './game/models/entities/champion.model';
import { MessageService, MessageType } from './services/message.service';
import { Game } from './game/models/game.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from './game/services/data.service';
import { Stat } from './game/models/entities/stats.enum';

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


  public dmg() {
    this.champ.takeDamage(9);
  }

  public heal() {
    this.champ.heal(3);
  }

  incSta() {
    this.champ.increaseStat(Stat.Stamina, 1);
  }

}
