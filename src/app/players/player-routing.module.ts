// import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerComponent } from './player.component';
import { PlayerCreateComponent } from './player-create.component';
import { PlayerDetailComponent } from './player-detail.component';
import { PlayerModuleGuard } from './player-module.guard';


const PlayerRoutes: Routes = [
    {
        path: '',
        component: PlayerComponent,
        canActivate: [PlayerModuleGuard]
    },
    {
        path: 'detail/:playerID',
        component: PlayerDetailComponent,
        canActivate: [PlayerModuleGuard]
    },
    {
        path: 'new',
        component: PlayerCreateComponent,
        canActivate: [PlayerModuleGuard]
    }
];

// @NgModule({
//     imports: [RouterModule.forChild(PlayerRoutes)],
//     exports: [RouterModule],
// })
// export class PlayerRoutingModule { }

export const routedComponents = [PlayerComponent];