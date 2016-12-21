import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map'

@Injectable()
export class PlayerService {
    constructor(private http: Http) { }

    private _playersURL = '/api/players';

    getPlayers() {
        return this.http.get(this._playersURL)
            .map(res => res.json(), this.handleError)
            .map(data => { console.log(data); return data; });
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}