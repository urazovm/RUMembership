import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlayerModuleGuard implements CanActivate {

    constructor(private router: Router, private userService: UserService) { }

    canActivate(): Observable<boolean> | boolean {
        return this.userService.authenticated()
            .map(
            result => {
                console.log(result);
                if (result.authenticated) {
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            }
            ).catch(error => {
                this.router.navigate(['/login']);
                return Observable.of(false);
            });
    }
}