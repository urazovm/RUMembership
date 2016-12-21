import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PlayerRPC } from '../rpc/PlayerRPC';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlayerService {

    private _playersURL = '/api/players';

    constructor(private http: Http) { }

    getPlayers() {
        return this.http
            .get(this._playersURL)
            .map(this.extractDataArray)
            // .toPromise()
            // .then(response => response.json() as PlayerRPC[])
            .catch(this.handleError);
    }

    getPlayer(id: number) {
        return this.http
            .get(this._playersURL + '/:' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        let play = body as PlayerRPC;
        // console.log(play);
        return play || {};
    }
    private extractDataArray(res: Response) {
        let body = res.json();
        let play = body as PlayerRPC[];
        // console.log(play);
        return play || {};
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
