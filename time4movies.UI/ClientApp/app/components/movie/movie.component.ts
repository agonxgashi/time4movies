import { Http, RequestOptions, Headers } from '@angular/http';
import { JsonPipe } from '@angular/common';
import { AppUser } from './../../models/Administration/appUser';
import { Quote } from './../../models/Movie/Quote'
import { Component, OnInit } from '@angular/core';
import { LogInSrv } from "../../services/logInService";
import { Router } from "@angular/router";
import { MovieModel } from './../../models/Movie/MovieModel';
import {
    Directive, forwardRef,
    Attribute, OnChanges, SimpleChanges, Input, ViewChild
} from '@angular/core';
import {
    NG_VALIDATORS, Validator,
    Validators, AbstractControl, ValidatorFn
} from '@angular/forms';





@Component({
    selector: 'movie',
    templateUrl: './movie.component.html',
    styles: [require('./movie.component.css')]
})
export class MovieComponent implements OnInit {






    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

}