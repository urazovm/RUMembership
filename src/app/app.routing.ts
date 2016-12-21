import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PlayerComponent } from './players/player.component';

const routes: Route[] = [
    {
        path: '', pathMatch: 'full', redirectTo: 'player'
    },
    {
        path: 'player',
        component: PlayerComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
    routes,
    {
        useHash: true
    }
);