import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { PlayerComponent } from './player.component';
import { PlayerDetailComponent } from './player-detail.component';
import { PlayerCreateComponent } from './player-create.component';

import { PlayerService } from '../shared/services/player.service';

import { PlayerModuleGuard } from './player-module.guard';

// import { PlayerRoutingModule } from './player-routing.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        // PlayerRoutingModule,
        MaterialModule.forRoot()
    ],
    exports: [],
    declarations: [
        PlayerComponent,
        PlayerCreateComponent,
        PlayerDetailComponent
    ],
    providers: [
        PlayerService,
        PlayerModuleGuard
    ],
})
export class PlayerModule { }
