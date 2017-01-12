import { MainComponent } from './main.component';
import { MainComponentGuard } from './main-component.guard';
import {IntroComponent} from '../intro/intro.component';
import { PlayerComponent } from '../players/player.component';

export const MainRoutes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [MainComponentGuard],
        children: [
            {path: '', component: IntroComponent},
            { path: 'players', component: PlayerComponent }
            //   ,
            //   { path: 'heroes', component: HeroesComponent },
            //   { path: 'detail', component: HeroDetailComponent }
        ]
    }
];

