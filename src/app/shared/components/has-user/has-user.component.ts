import { Component, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'hasUser'
})
export class HasUserComponent implements OnInit {
    email = 'Test Name';
    username = 'testname';
    profilePicture = '';


    loggedIn = false;

    constructor(protected userService: UserService) { }

    ngOnInit() {
        this.getMe();
    }

    getMe() {
        this.userService.getMe().subscribe(me => {
            if (me) {
                this.loggedIn = true;
                this.email = me.emailaddress;
                this.username = me.username;
                this.profilePicture = me.profilePicture;
            }
        });
    }
}