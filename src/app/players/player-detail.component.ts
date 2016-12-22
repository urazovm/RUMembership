import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PlayerRPC } from '../shared/rpc/playerRPC';
import { PlayerService } from '../shared/services/player.service';

@Component({
    selector: 'app-player-detail',
    templateUrl: 'player-detail.component.html',
    styleUrls: []
})
export class PlayerDetailComponent implements OnInit {
    player: PlayerRPC;
    errorMessage: string;
    updateAll = false;

    constructor(private playerService: PlayerService,
        private route: ActivatedRoute) { }

    getPlayer(id: number) {
        this.playerService.getPlayer(id)
            .subscribe(player => {
                this.player = player;
                console.log(player)
            },
            error => this.errorMessage = <any>error);
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['playerID'];
            this.getPlayer(id);
        });
    }
}
