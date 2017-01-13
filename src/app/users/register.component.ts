import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    loginLink = '/login';

    submitted: boolean = false;
    errorDiagnostic: string;

    registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private _userService: UserService, private _router: Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(32)])],
            passwordDup: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(32)])],
            firstName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])],
            nickName: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(64)])],
            lastName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])],
            dob: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])],
            gender: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])],
            email: ['', Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
            contactNumber: ['', Validators.compose([Validators.required, Validators.pattern("\d")])],
            address1: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])],
            address2: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])],
            town: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])],
            postCode: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])],
            emergencyName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])],
            emergencyContactEmail: ['', Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
            emergencyContactNumber: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])],
            emergencyRelationship: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])],
            medical: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])],
            u18: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])],
            student: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])],
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