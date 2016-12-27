import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { PlayerModule } from './players/player.module';

import { LoginComponent } from './users/login.component';
import { RegisterComponent } from './register/register.component';

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
    LoginComponent
  ],
  imports: [
    routing,
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
