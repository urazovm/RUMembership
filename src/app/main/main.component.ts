import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    name = 'Test Name';
    username = 'testname';
    title = 'UI Test Screen';

    constructor() { }

    ngOnInit() { }
}