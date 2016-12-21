import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PlayerRPC } from '../rpc/PlayerRPC';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlayerService {
    constructor(private http: Http) { }

    private _playersURL = '/api/players';

    getPlayers() {
        return this.http
            .get(this._playersURL)
            .map(this.extractData)
            // .toPromise()
            // .then(response => response.json() as PlayerRPC[])
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        let play = body as PlayerRPC[];
        console.log(play);
        return play || {};
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}