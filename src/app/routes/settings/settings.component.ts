import { Component, OnInit } from '@angular/core';

import { Game } from '../../game/models/game.model';
import { Resource } from '../../game/models/resources.enum';
import { DataService } from '../../game/services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  private game: Game;

  public devGoldInput: number;
  public devWoodInput: number;
  public devStoneInput: number;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.game = this.dataService.game;
    this.devGoldInput = 0;
    this.devWoodInput = 0;
    this.devStoneInput = 0;
  }

  public devAdd(): void {
    this.game.add(Resource.Gold, this.devGoldInput);
    this.game.add(Resource.Wood, this.devWoodInput);
    this.game.add(Resource.Stone, this.devStoneInput);
  }
  
}
