import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { LoginComponent } from './users/login.component';
import { RegisterComponent } from './register/register.component';
import { PlayerComponent } from './players/player.component';
import { PlayerDetailComponent } from './players/player-detail.component';
import { PlayerCreateComponent } from './players/player-create.component';

import { PlayerService } from './shared/services/player.service';
import { UserService } from './shared/services/user.service';

import { routing } from './app.routing';

import { AppComponent } from './app.component';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PlayerComponent,
    PlayerDetailComponent,
    PlayerCreateComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [PlayerService, UserService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
