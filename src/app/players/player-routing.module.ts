import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerComponent } from './player.component';
import { PlayerCreateComponent } from './player-create.component';
import { PlayerDetailComponent } from './player-detail.component';

const routes: Routes = [
    {
        path: 'player',
        component: PlayerComponent
    },
    {
        path: 'player/detail/:playerID',
        component: PlayerDetailComponent
    },
    {
        path: 'player/new',
        component: PlayerCreateComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlayerRoutingModule { }

export const routedComponents = [PlayerComponent];