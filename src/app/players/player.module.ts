import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { PlayerComponent } from './player.component';
import { PlayerDetailComponent } from './player-detail.component';
import { PlayerCreateComponent } from './player-create.component';

import { PlayerService } from '../shared/services/player.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MaterialModule.forRoot()
    ],
    exports: [],
    declarations: [
        PlayerComponent,
        PlayerCreateComponent,
        PlayerDetailComponent
    ],
    providers: [PlayerService],
})
export class PlayerModule { }
