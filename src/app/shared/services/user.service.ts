import { Injectable, Inject } from '@angular/core';
//import { Control } from '@angular/common';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/**
 * Import interfaces that service depends on
 */
import { UserRPC } from '../rpc/userRPC';

@Injectable()
export class UserService {

    private _usersAPI = '/api/authentication';

    constructor(private http: Http) {

    }

    private _loginApi = this._usersAPI + '/local';
    private _logoutApi = this._usersAPI + '/logout';
    private _authenticatedApi = this._usersAPI + '/authenticated';
    private _registerApi = this._usersAPI + '/register';
    private _userExistsApi = this._usersAPI + '/exists';

    login(user) {
        let body = JSON.stringify(user);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this._loginApi, body, <RequestOptionsArgs>{ headers: headers, withCredentials: true })
            .map((res: Response) => res)
            .catch(this.handleError);
    }

    authenticated() {
        return this.http.get(this._authenticatedApi, <RequestOptionsArgs>{ withCredentials: true })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    logout() {
        return this.http.get(this._logoutApi, <RequestOptionsArgs>{ withCredentials: true })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    register(user) {
        let body = JSON.stringify(user);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this._registerApi, body, <RequestOptionsArgs>{ headers: headers, withCredentials: true })
            .map((res: Response) => res)
            .catch(this.handleError);
    }

    // getUsers() {
    //     return this.http.get(this._apiBase + "/api/users?limit=5&desc=true", <RequestOptionsArgs>{ withCredentials: true })
    //         .map((res: Response) => res.json())
    //         .catch(this.handleError);
    // }

    // getMe() {
    //     return this.http.get(this._apiBase + '/api/users/me/', <RequestOptionsArgs>{ withCredentials: true })
    //         .map((res: Response) => res.json().me)
    //         .catch(this.handleError);
    // }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        return Observable.throw(error || "Server Error");
    }
}