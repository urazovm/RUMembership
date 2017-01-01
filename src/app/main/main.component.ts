import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    name = 'Test Name';
    username = 'testname';
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
                this.name = me.emailaddress;
                this.username = me.username;
            }
        });
    }
}