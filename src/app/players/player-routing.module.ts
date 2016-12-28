import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerComponent } from './player.component';
import { PlayerCreateComponent } from './player-create.component';
import { PlayerDetailComponent } from './player-detail.component';
import { PlayerModuleGuard } from './player-module.guard';


const routes: Routes = [
    {
        path: 'player',
        component: PlayerComponent,
        canActivate: [PlayerModuleGuard]
    },
    {
        path: 'player/detail/:playerID',
        component: PlayerDetailComponent,
        canActivate: [PlayerModuleGuard]
    },
    {
        path: 'player/new',
        component: PlayerCreateComponent,
        canActivate: [PlayerModuleGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlayerRoutingModule { }

export const routedComponents = [PlayerComponent];