
import { LandingPageComponent } from './components/landing/landingpage.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MovieComponent } from './components/movie/movie.component';
import { LogInSrv } from './services/logInService'
import { SideBarComponent } from './components/sidebar/sidebar.component';
import { httpFactory } from './services/AuthServices/HttpFactory'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';


@NgModule({
    declarations: [
                AppComponent,
                NavMenuComponent,
                ProfileComponent,
                FetchDataComponent,
                HomeComponent,
                LandingPageComponent,
                MovieComponent,
                SideBarComponent

            ],
            imports: [
                        CommonModule,
                        HttpModule,
                        FormsModule,
                        RouterModule.forRoot([
                            { path: '', redirectTo: 'home', pathMatch: 'full' },
                            { path: 'home', component: HomeComponent },
                            { path: 'profile', component: ProfileComponent },
                            { path: 'fetch-data', component: FetchDataComponent },
                            //{ path: 'landing', component: LandingPageComponent },
                            { path: 'movie/:id', component: MovieComponent },
                            //{ path: 'sidebar', component: SideBarComponent },
                            { path: '**', redirectTo: 'home' }
                        ])
                    ],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: Http,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions]
        },
        LogInSrv
    ]
})
export class AppModuleShared { }