import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PlayerService } from '../shared/services/player.service';

import { PlayerRPC } from '../shared/rpc/playerRPC';

@Component({
    moduleId: 'playerComponent',
    selector: 'app-player',
    templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit {
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
        let link = ['detail', this.selectedPlayer.id];
        this.router.navigate(link);
    }

    ngOnInit() {
        this.getPlayers();
    }
}
