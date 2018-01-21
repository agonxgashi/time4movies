import { Component, OnInit } from '@angular/core';
import { AppUser } from './../../models/Administration/appUser';
import { LogInSrv } from './../../services/logInService'
import { ActivatedRoute, Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
 
@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.css',]
})
export class ProfileComponent implements OnInit {
    user: AppUser | undefined;
    username: string;


    constructor(private _ls: LogInSrv, private route: ActivatedRoute, private router: Router, private http: Http) {
        this.user = this._ls.retrieveUser();
    }


    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.username = params['id'] ? params['id'] : this.username;            
        });

        this.http.get("api/AppUser/ByUsername?username " + this.username)
            .subscribe(
            (res) => { this.user = res.json(); console.log(this.user) },
            (err) => { }
            );
    }

    goToProfile() {

 
    }
}
