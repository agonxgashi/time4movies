import { Http, RequestOptions, Headers } from '@angular/http';
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
    movieComments: Comment[] = [];

    user: AppUser | undefined;

    constructor(private route: ActivatedRoute, private router: Router, private http: Http, private ls: LogInSrv) {
        this.comment = new Comment();
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
                        (res) => { this.movie = res.json(); console.log(this.movie); },
                        (err) => { }
                    );                      
        });
    }

    watched(w: Watched) {
        this.http.get("api/Logic/InsertWatched", JSON.stringify(w.movieId))
            .subscribe(
                (res) => { this.movie = res.json() },
                (err) => {}
            );
    }

    goToTrending() {
        this.router.navigate(['/home']);
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
                    c.content = this.comment.content;
                    this.movieComments.push(c);
                } else {
                    alert("Error");
                }
                    
                },
                (err) => {}
            );

    }


}