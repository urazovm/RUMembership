import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { Observable } from 'rxjs/Observable';

import { MainComponent } from './main.component';

@Injectable()
export class MainComponentGuard implements CanActivate {

    constructor(private _router: Router, private _userService: UserService) { }

    canActivate(): Observable<boolean> | boolean {
        console.log('MainComponentGuard');
        return this._userService.authenticated()
            .map(
            result => {
                console.log(result);
                if (result.authenticated) {
                    return true;
                } else {
                    this._router.navigate(['/login']);
                    return false;
                }
            }
            ).catch(error => {
                this._router.navigate(['/login']);
                return Observable.of(false);
            });
    }
}