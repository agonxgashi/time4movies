import { Http, RequestOptions, Headers } from '@angular/http';
import { DatePipe } from '@angular/common';
import { AppUser } from './../../models/Administration/appUser';
import { Quote } from './../../models/Movie/Quote'; //A po don me hi te models? modelsi i MovieModelit mvyn
import { Component, OnInit } from '@angular/core';
import { LogInSrv } from "../../services/logInService";
import { Router, ActivatedRoute} from "@angular/router";
import { MovieModel } from './../../models/Movie/MovieModel';
import { Watched } from './../../models/Logic/Watched';
import { Comment } from './../../models/Logic/Comment'

@Component({
    selector: 'movie',
    templateUrl: './movie.component.html',
    styles: [require('./movie.component.css')]
})

export class MovieComponent implements OnInit {
    private movId: number;
    quote: Quote;
    movie: MovieModel;
    comment: Comment;
    movieComments: Comment[];
    isWatched: boolean;

    user: AppUser | undefined;
    
    constructor(private route: ActivatedRoute, private router: Router, private http: Http, private ls: LogInSrv) {
        this.comment = new Comment();
        this.movieComments = [];
        this.user = this.ls.retrieveUser();
        this.comment.userId = this.user ? this.user.id : -1;
    }


    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.movId = params['id'];
            this.comment.movieId = this.movId;
            var q: string = this.user
                ? "/api/Search/ById?id=" + this.movId + "&userId=" + this.user.id
                : "/api/Search/ById?id=" + this.movId;

                this.http.get(q)
                    .subscribe(
                    (res) => { this.movie = res.json(); console.log(this.movie); this.getComments(); },
                        (err) => { }
                    );                      
        });
    }

    watched() {

        let watched = new Watched();
        watched.movieId = this.movId;
        watched.userId = this.user ? this.user.id : -1;
        console.log(this.user);
        console.log(watched);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http.post("/api/Logic/InsertWatched", JSON.stringify(watched), options)
            .subscribe(
            (res) => {
                this.movie.isWatchedByUser = true;
            },
            (err) => {}
            );
    }

    removeWatched() {
        let watched = new Watched();
        watched.movieId = this.movId;
        watched.userId = this.user ? this.user.id : -1;
        console.log(this.user);
        console.log(watched);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http.post("/api/Logic/RemoveWatched", JSON.stringify(watched), options)
            .subscribe(
            (res) => {
                this.movie.isWatchedByUser = false;
            },
            (err) => { }
            );
    }

    goToTrending() {
        this.router.navigate(['/home']);
    }

    getComments() {
        this.http.get("/api/Comment/ByMovie?movieId=" + this.movId)
            .subscribe(
            (res) => { this.movieComments = res.json(); console.log(this.movieComments)  },
                (err) => { }
            );

    }

    addComment() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post("/api/Comment/Post", this.comment, options)
            .subscribe(
            (res) => {
                if (res.text() === "true") {
                    console.log(res);
                    let c = new Comment();

                    if (this.user) {
                        c.authorName = this.user.username;
                        c.createDate = new Date();
                    }
                    c.content = this.comment.content;
                    this.movieComments.push(c);
                    this.comment = new Comment();
                } else {
                    alert("Error");
                }
                    
                },
                (err) => {}
            );

    }


}