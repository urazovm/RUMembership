import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

import { PlayerRPC } from '../shared/rpc/playerRPC';
import { PlayerService } from '../shared/services/player.service';

@Component({
    selector: 'app-player-create',
    templateUrl: './player-create.component.html',
    styleUrls: []
})
export class PlayerCreateComponent implements OnInit {
    @ViewChild('playerForm') playerForm: NgForm;

    origPlayer: PlayerRPC;
    player: PlayerRPC;
    errorMessage: string;

    constructor(private playerService: PlayerService,
        private route: ActivatedRoute,
        private location: Location) { }

    getPlayer(id: number) {
        this.playerService.getPlayer(id)
            .subscribe(player => {
                this.player = player;
                this.origPlayer = player
            },
            error => this.errorMessage = <any>error);
    }

    goBack() {
        this.location.back();
    }

    onSubmit() {

    }



    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['playerID'];
            this.getPlayer(id);
        });
    }
}
