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

    player: PlayerRPC;

    constructor(private playerService: PlayerService,
        private route: ActivatedRoute,
        private location: Location) { }

    goBack() {
        this.location.back();
    }

    onSubmit() {
        this.playerService.createPlayer(this.player).subscribe(player => {
            console.log('Success!');
            console.log(player);
        });
    }

    ngOnInit() {
        this.player = new PlayerRPC();
    }
}
