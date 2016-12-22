import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PlayerComponent } from './players/player.component';
import { PlayerDetailComponent } from './players/player-detail.component';

const routes: Route[] = [
    {
        path: '', pathMatch: 'full', redirectTo: 'player'
    },
    {
        path: 'player',
        component: PlayerComponent
    },
    {
        path: 'player/detail/:playerID',
        component: PlayerDetailComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
    routes,
    {
        useHash: true
    }
);
