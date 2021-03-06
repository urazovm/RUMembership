import { MainComponent } from './main.component';
import { MainComponentGuard } from './main-component.guard';
import { IntroComponent } from '../intro/intro.component';
import { PlayerComponent } from '../players/player.component';
import { PlayerDetailComponent } from '../players/player-detail.component';
import { PlayerCreateComponent } from '../players/player-create.component';

export const MainRoutes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [MainComponentGuard],
        children: [
            { path: '', component: IntroComponent },
            { path: 'players', component: PlayerComponent },
            {
                path: 'player', component: PlayerDetailComponent,
                children: [
                    { path: ':id', component: PlayerDetailComponent },
                    { path: 'new', component: PlayerCreateComponent }
                ]
            }
            //   ,
            //   { path: 'heroes', component: HeroesComponent },
            //   { path: 'detail', component: HeroDetailComponent }
        ]
    }
];

