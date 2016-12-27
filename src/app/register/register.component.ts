import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    loginLink = '/login';

    submitted: boolean = false;
    errorDiagnostic: string;

    registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private _userService: UserService, private _router: Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])],
            username: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])],
            email: ['', Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(32)])]
        });
    }

    onSubmit() {
        /**
         * Innocent until proven guilty
         * (show nothing until the request completes)
         */
        this.submitted = true;
        this.errorDiagnostic = null;

        this._userService.register(this.registerForm.value).subscribe(data => {
            this._router.navigateByUrl('/login');
        },
            error => {
                this.submitted = false;
                this.errorDiagnostic = error.status;//] || USER_STATUS_CODES[500];
            });
    }
}