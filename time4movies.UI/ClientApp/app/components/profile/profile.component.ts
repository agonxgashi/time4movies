import { Component, OnInit } from '@angular/core';
import { AppUser } from './../../models/Administration/appUser';
import { LogInSrv } from './../../services/logInService'
import { ActivatedRoute, Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Comment } from './../../models/Logic/Comment'

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    userFromJwt: AppUser | undefined;
    user: AppUser;
    userToUpdate: AppUser;
    username: string;
    repeatedPsw: string;
    isMyProfile: boolean;
    isFullyLoaded: boolean;
    userComments: Comment[] = [];



    constructor(private _ls: LogInSrv, private route: ActivatedRoute, private router: Router, private http: Http) {
        this.userFromJwt = this._ls.retrieveUser();
        this.user = new AppUser();
    }


    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.username = params['id'];

            if (params['id']) {
                this.username = params['id'];
                this.isMyProfile = false;
            } else if (this.userFromJwt) {
                this.username = this.userFromJwt.username;
                this.isMyProfile = true;
            };

            var q: string = '/api/AppUser/ByUsername?username=' + this.username;

            this.http.get(q)
                .subscribe(
                (res) => {
                    this.user = res.json();
                    this.userToUpdate = this.user;
                    console.log(this.userToUpdate)
                        this.getComments();
                        this.isFullyLoaded = true;
                    },
                    (err) => { }
                );
        });

    }

    updateUSerInfo() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post("/api/AppUser/UpdateUser", JSON.stringify(this.userToUpdate), options)
            .subscribe(
            (res) => { },
            (err) => { }
            );
    }

    updateUserPassword() {
        let user = new AppUser();
 
        user.id = this.userToUpdate.id;
        user.password = this.userToUpdate.password;
        let newPassword: any = user.password;
       
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post("/api/AppUser/UpdatePassword", JSON.stringify(this.userToUpdate), options)
            .subscribe(
            (res) => { alert(res.text()) },
            (err) => { }
            );
    }
    getComments() {
        this.http.get("/api/Comment/ByUser?userId=" + this.user.id)
            .subscribe(
                (res) => { this.userComments = res.json(); console.log(this.userComments);},
                (err) => { }
            );

    }



    goToMovie(movId:number) {
        this.router.navigate(['/movie/' + movId])
    }

}
