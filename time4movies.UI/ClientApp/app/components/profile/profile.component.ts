import { Component } from '@angular/core';
import { AppUser } from './../../models/Administration/appUser';
import { LogInSrv } from './../../services/logInService'
 
@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.css',]
})
export class ProfileComponent {
    user: AppUser | undefined;

    constructor(private _ls: LogInSrv) {
        this.user = this._ls.retrieveUser();
    }

    


}
