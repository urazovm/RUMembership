import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './shared/services/user.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UnauthenticatedGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) { }

    canActivate(): Observable<boolean> | boolean {
        return this.userService.authenticated()
            .map(
            result => {
                console.log(result);
                if (!result.authenticated) {
                    return true;
                } else {
                    this.router.navigate(['/']);
                    return false;
                }
            }
            ).catch(error => {
                return Observable.of(true);
            });
    }
}