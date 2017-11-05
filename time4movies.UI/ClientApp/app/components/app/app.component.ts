import { AppUser } from './../../models/Administration/appUser';
import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    appUsr: AppUser = new AppUser();

    constructor(){
        
    }
}
