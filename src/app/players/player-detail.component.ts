import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

import { PlayerRPC } from '../shared/rpc/playerRPC';
import { PlayerService } from '../shared/services/player.service';

@Component({
    selector: 'app-player-detail',
    templateUrl: './player-detail.component.html',
    styleUrls: []
})
export class PlayerDetailComponent implements OnInit {
    @ViewChild('playerForm') playerForm: NgForm;

    origPlayer: PlayerRPC;
    player: PlayerRPC;
    errorMessage: string;
    updateAll = false;

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
        if (this.updateAll) {
            console.log('admin path');
            // use the admin path to change everything!
        }
        else {
            this.playerService.updatePlayer(this.player).subscribe(player => {
                console.log('success');
            })
        }
    }


    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['playerID'];
            this.getPlayer(id);
        });
    }
}
