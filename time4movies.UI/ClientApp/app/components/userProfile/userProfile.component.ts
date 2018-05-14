import { Component, OnInit } from '@angular/core';
import { AppUser } from './../../models/Administration/appUser';
import { LogInSrv } from './../../services/logInService'
import { ActivatedRoute, Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
 
@Component({
    selector: 'userProfile',
    templateUrl: './userProfile.component.html',
        styleUrls: ['./userProfile.component.css',]
})
export class UserProfileComponent implements OnInit {
    user: AppUser | undefined;



    constructor(private _ls: LogInSrv, private route: ActivatedRoute, private router: Router, private http: Http) {
        this.user = this._ls.retrieveUser();
    }


    ngOnInit(): void {
        //this.route.params.subscribe(params => {
        //    this.username = params['id'];
            //var q: string = this.user
            //    ? "/api/Search/ById?id=" + this.movId + "&userId=" + this.user.id
            //    : "/api/Search/ById?id=" + this.movId;

            //this.http.get(q)
            //    .subscribe(
            //        (res) => { this.movie = res.json(); console.log(this.movie); this.getComments(); },
            //        (err) => { }
            //    );
        //});
    }

    goToProfile() {

 
    }
}
