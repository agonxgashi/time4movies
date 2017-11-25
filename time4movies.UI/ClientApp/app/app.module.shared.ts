
import { LandingPageComponent } from './components/landing/landingpage.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';

import { LogInSrv } from './services/logInService'
import { httpFactory } from './services/AuthServices/HttpFactory'

// @NgModule({
//     declarations: [
//         AppComponent,
//         NavMenuComponent,
//         CounterComponent,
//         FetchDataComponent,
//         HomeComponent,
//         LandingPageComponent
//     ],
//     providers: [
//         {
//             provide: Http,
//             useClass: httpFactory,
//             deps: [XHRBackend, RequestOptions]
//         },
//         LogInSrv
//     ],
//     imports: [
//         CommonModule,
//         HttpModule,
//         FormsModule,
//         RouterModule.forRoot([
//             { path: '', redirectTo: 'landing', pathMatch: 'full' },
//             { path: 'home', component: HomeComponent },
//             { path: 'counter', component: CounterComponent },
//             { path: 'fetch-data', component: FetchDataComponent },
//             { path: 'landing', component: LandingPageComponent },
//             { path: '**', redirectTo: 'home' }
//         ])
//     ]
// })
// export class AppModuleShared {
// }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';


@NgModule({
    declarations: [
                AppComponent,
                NavMenuComponent,
                CounterComponent,
                FetchDataComponent,
                HomeComponent,
                LandingPageComponent
            ],
            imports: [
                        CommonModule,
                        HttpModule,
                        FormsModule,
                        RouterModule.forRoot([
                            { path: '', redirectTo: 'landing', pathMatch: 'full' },
                            { path: 'home', component: HomeComponent },
                            { path: 'counter', component: CounterComponent },
                            { path: 'fetch-data', component: FetchDataComponent },
                            { path: 'landing', component: LandingPageComponent },
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