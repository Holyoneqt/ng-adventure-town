import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BuildingService } from './game/services/building.service';
import { DataService } from './game/services/data.service';
import { SpellService } from './game/services/spell.service';
import { AppRoutingModule } from './modules/app-router.module';
import { MaterialModule } from './modules/material.module';
import { AdventureComponent } from './routes/adventure/adventure.component';
import { BuildingsComponent } from './routes/buildings/buildings.component';
import { HomeComponent } from './routes/home/home.component';
import { SettingsComponent } from './routes/settings/settings.component';
import { MessageService } from './services/message.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdventureComponent,
    BuildingsComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [
    DataService,
    MessageService,
    BuildingService,
    SpellService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
