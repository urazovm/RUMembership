import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styles: ['./main.component.css']
})
export class MainComponent implements OnInit {
    name = 'Test Name';
    username = 'testname';
    title = 'UI Test Screen';

    constructor() { }

    ngOnInit() { }
}