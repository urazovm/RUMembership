import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PlayerRPC } from '../rpc/playerRPC';

@Injectable()
export class PlayerService {

    private _playersURL = '/api/players';

    constructor(private http: Http) { }

    getPlayers() {
        return this.http
            .get(this._playersURL)
            .map(this.extractDataArray)
            .catch(this.handleError);
    }

    getPlayer(id: number) {
        return this.http
            .get(this._playersURL + '/' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updatePlayer(playerRPC: PlayerRPC) {
        return this.http.put(this._playersURL + '/' + playerRPC.id, playerRPC)
            .map(function (res: Response) {
                console.log('got a response!')
            })
            .catch(this.handleError);
    }

    createPlayer(playerRPC: PlayerRPC) {
        return this.http.post(this._playersURL, playerRPC)
            .map(function (res: Response) {
                console.log('got a response!');
                console.log(res);
                let body = res.json();
                console.log(body);
                return res.json().player;
            })
    }

    private extractData(res: Response) {
        try {
            let body = res.json();
            let play = body as PlayerRPC;
            return play || new PlayerRPC;
        } catch (error) {
            return new PlayerRPC;
        }

    }
    private extractDataArray(res: Response) {
        let body = res.json();
        let play = body as PlayerRPC[];
        return play || {};
    }

    private handleError(error: Response) {
        console.error('Exception', error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
