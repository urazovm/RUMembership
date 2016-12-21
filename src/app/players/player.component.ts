import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../shared/services/player.service';

import { PlayerRPC } from '../shared/rpc/playerRPC';

@Component({
    moduleId: 'playerComponentModule',
    selector: 'player',
    templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit {
    players: PlayerRPC[];
    selectedPlayer: PlayerRPC;
    errorMessage: string;

    constructor(private playerService: PlayerService) { }

    ngOnInit() {
        this.playerService.getPlayers()
            .subscribe(players => this.players = players,
            error => this.errorMessage = <any>error);
    }
}