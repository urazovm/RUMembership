import { Inject, ViewChild } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { USER_STATUS_CODES } from '../shared/rpc/user-status-codes';
import { UserService } from '../shared/services/user.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: []
})

export class LoginComponent implements OnInit/*, OnDestroy*/ {
    title = 'Login';
    registerLink = '/register';

    //    authenticatedObs: Observable<boolean>;
    //  userServiceSub: Subscription;
    // authSub: Subscription;

    loginForm: FormGroup;

    submitted: boolean = false;
    errorDiagnostic: string;

    constructor(private _userService: UserService, private _router: Router, private formBuilder: FormBuilder) {

    }

    ngOnInit() {

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
        });

    }

    // authenticated(): Observable<boolean> {
    //     if (this.authenticatedObs) return this.authenticatedObs;
    //     this.authenticatedObs = this._userService.authenticated()
    //         .map(data => { return data.authenticated });
    //     return this.authenticatedObs;
    // }




    register() {
        this._router.navigate(['/register']);
    }

    onSubmit() {
        /**
         * Innocent until proven guilty
         */
        this.submitted = true;
        this.errorDiagnostic = null;

        this._userService.login(this.loginForm.value).subscribe(data => {
            console.log('logged in', data);
            this._router.navigate(['/']);
        },
            error => {
                this.submitted = false;
                this.errorDiagnostic = USER_STATUS_CODES[error.status] || USER_STATUS_CODES[500];
            });
    }

    // ngOnDestroy() {
    //     if (this.userServiceSub) this.userServiceSub.unsubscribe();
    //     if (this.authSub) this.authSub.unsubscribe();
    // }

}