import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { PlayerModule } from './players/player.module';
//above should bring in the player routing too?

import { MainComponent } from './main/main.component';
import { IntroComponent } from './intro/intro.component';
import { LoginComponent } from './users/login.component';
import { RegisterComponent } from './users/register.component';

import { UserService } from './shared/services/user.service';

import { UnauthenticatedGuard } from './unauthenticated.guard';
import { MainComponentGuard } from './main/main-component.guard';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    IntroComponent
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
  providers: [
    UserService,
    UnauthenticatedGuard,
    MainComponentGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
