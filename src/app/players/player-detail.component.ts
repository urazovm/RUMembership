import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PlayerService } from '../shared/services/player.service';

@Component({
    moduleId: 'playerDetailComponent',
    selector: 'app-player-detail',
    templateUrl: 'player-detail.component.html'
})
export class PlayerDetailComponent implements OnInit {
    constructor(private playerService: PlayerService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.playerService.getPlayer(id);

        });
    }
}
