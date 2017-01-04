import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    email = 'Test Name';
    username = 'testname';
    profilePicture = '';
    title = 'UI Test Screen';

    loggedIn = false;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.getMe();
    }

    getMe() {
        this.userService.getMe().subscribe(me => {
            if (me) {
                this.loggedIn = true;
                console.log(me);
                this.email = me.emailaddress;
                this.username = me.username;
                this.profilePicture = me.profilePicture;
            }
        });
    }
}