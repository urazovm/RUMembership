import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { PlayerComponent } from './players/player.component';
import { PlayerDetailComponent } from './players/player-detail.component';

import { PlayerService } from './shared/services/player.service';

import { routing } from './app.routing';

import { AppComponent } from './app.component';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    PlayerDetailComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [PlayerService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
