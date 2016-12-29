import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PlayerService } from '../shared/services/player.service';

import { PlayerRPC } from '../shared/rpc/playerRPC';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: []
})
export class PlayerComponent implements OnInit {
    title = 'List all Players';
    players: PlayerRPC[];
    selectedPlayer: PlayerRPC;
    errorMessage: string;

    constructor(private playerService: PlayerService,
        private router: Router) { }

    getPlayers(): void {
        this.playerService.getPlayers()
            .subscribe(players => this.players = players,
            error => this.errorMessage = <any>error);
    }

    onSelect(player: PlayerRPC): void {
        let link = ['player/detail', player.id];
        this.router.navigate(link);
    }

    ngOnInit() {
        this.getPlayers();
    }
}
