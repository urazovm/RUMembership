import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { PlayerService } from './shared/services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Check API Works";

  observable$: Observable<{}>;

  constructor(private _playerService: PlayerService) {
    this._playerService.getPlayers()
      .map((response: Response) => response.json())
      .subscribe((response: Response) => {
        console.log(response);
      });

  }


}
