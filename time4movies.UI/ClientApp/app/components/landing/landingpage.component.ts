import { Http } from '@angular/http';
import { AppUser } from './../../models/Administration/appUser';
import { Component } from '@angular/core';

@Component({
    selector: 'landingpage',
    templateUrl: './landingpage.component.html',
    styles: [require('./landing.component.css')]
})
export class LandingPageComponent{  
    userToEdit: AppUser = new AppUser();

    constructor(private http: Http) { }

    login(){

    }

    signUp() {
        
    }
}