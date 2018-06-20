import { SpellService } from './../../game/services/spell.service';
import { Component, OnInit } from '@angular/core';
import { Spell } from '../../game/models/spells/spell.model';

@Component({
  selector: 'app-magic-trainer',
  templateUrl: './magic-trainer.component.html',
  styleUrls: ['./magic-trainer.component.css']
})
export class MagicTrainerComponent implements OnInit {

  public spells: Spell[];

  constructor(private spellService: SpellService) { }

  ngOnInit() {
    this.spells = this.spellService.getAll();
  }

}
