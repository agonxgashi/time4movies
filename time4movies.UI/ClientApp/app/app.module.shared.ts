import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { CommonModule }         from '@angular/common';
import { RouterModule }         from '@angular/router';
import { AppComponent }         from './components/app/app.component';
import { NavMenuComponent }     from './components/navmenu/navmenu.component';
import { HomeComponent }        from './components/home/home.component';
import { ProfileComponent }     from './components/profile/profile.component';
import { MovieComponent }       from './components/movie/movie.component';
import { LogInSrv }             from './services/logInService'
import { httpFactory }          from './services/AuthServices/HttpFactory'
import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';



@NgModule({
    declarations: [
                AppComponent,
                NavMenuComponent,
                ProfileComponent,
                HomeComponent,
                MovieComponent

            ],
            imports: [
                        CommonModule,
                        HttpModule,
                        FormsModule,
                        RouterModule.forRoot([
                            { path: '', redirectTo: 'home', pathMatch: 'full' },
                            { path: 'home', component: HomeComponent },
                            { path: 'profile/:id', component: ProfileComponent },
                            { path: 'profile', component: ProfileComponent },
                            
                            { path: 'fetch-data', component: FetchDataComponent },
                            //{ path: 'landing', component: LandingPageComponent },
                            { path: 'movie/:id', component: MovieComponent },
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