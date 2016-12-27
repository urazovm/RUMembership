import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { PlayerModule } from './players/player.module';
//above should bring in the player routing too?

import { LoginComponent } from './users/login.component';

import { PlayerService } from './shared/services/player.service';
import { UserService } from './shared/services/user.service';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    PlayerModule,
    MaterialModule.forRoot()
  ],
  providers: [UserService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
