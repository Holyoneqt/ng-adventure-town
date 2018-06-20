import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../routes/home/home.component';
import { SettingsComponent } from '../routes/settings/settings.component';
import { MagicTrainerComponent } from '../routes/magic-trainer/magic-trainer.component';
import { AdventureComponent } from './../routes/adventure/adventure.component';
import { BuildingsComponent } from './../routes/buildings/buildings.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  { path: 'home', component: HomeComponent },
  { path: 'adventure', component: AdventureComponent },
  { path: 'buildings', component: BuildingsComponent },
  { path: 'magic-trainer', component: MagicTrainerComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
