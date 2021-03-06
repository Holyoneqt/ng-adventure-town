import { MessageService, MessageType } from '../../services/message.service';
import { Component, OnInit } from '@angular/core';

import { Building } from '../../game/models/buildings/building.model';
import { BuildingService } from '../../game/services/building.service';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit {

  public buildings: Building[];

  constructor(private buildingService: BuildingService, private messageService: MessageService) { }

  ngOnInit() {
    this.buildings = this.buildingService.getWhere(b => b.unlocked.get() === true);
    this.buildingService.getAll().forEach(b => {
      b.unlocked.subscribe(changeVal => this.buildings = this.buildingService.getWhere(b => b.unlocked.get() === true))
    });
  }

  levelUp(building: Building): void {
    if (building.levelUp()) {
      this.messageService.writeMessage(MessageType.Success, `${building.name} has reached Level ${building.level}!`);
    } else {
      this.messageService.writeMessage(MessageType.Info, `Not enough Resources!`);
    }
  }

}
