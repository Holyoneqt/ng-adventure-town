import { Component, OnInit } from '@angular/core';

import { Spell } from '../../game/models/spells/spell.model';
import { SpellService } from '../../game/services/spell.service';
import { MessageService, MessageType } from '../../services/message.service';

@Component({
  selector: 'app-magic-trainer',
  templateUrl: './magic-trainer.component.html',
  styleUrls: ['./magic-trainer.component.css']
})
export class MagicTrainerComponent implements OnInit {

  public spells: Spell[];

  constructor(private messageService: MessageService, private spellService: SpellService) { }

  ngOnInit() {
    this.spells = this.spellService.getAll();
    this.spells.forEach(s => s.getNextSpellRankData()); // Load Description
  }

  public learnSpell(spell: Spell): void {
    if (spell.increaseRank()) {
      spell.getNextSpellRankData();
      this.messageService.writeMessage(MessageType.Success, `You learned: ${spell.name} (Rank ${spell.rank})`);
    } else {
      this.messageService.writeMessage(MessageType.Info, 'Not enough Gold!');
    }
  }

}
