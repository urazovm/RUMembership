import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

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
        private route: ActivatedRoute,
        private location: Location) { }

    getPlayer(id: number) {
        this.playerService.getPlayer(id)
            .subscribe(player => this.player = player,
            error => this.errorMessage = <any>error);
    }

    goBack() {
        this.location.back();
    }

    onSubmit() {
        // this.submitted = true;
        console.log('Form submitted!');
    }


    updateHero() {
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['playerID'];
            this.getPlayer(id);
        });
    }
}
