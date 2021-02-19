import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthHttpInterceptor, AuthModule} from '@auth0/auth0-angular';
import {environment as env} from '../environments/environment';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HighlightModule, HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        NavBarComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        HighlightModule,
        FontAwesomeModule,
        AuthModule.forRoot({
            ...env.auth,
            httpInterceptor: {
                ...env.httpInterceptor,
            },
        }),
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthHttpInterceptor,
        multi: true,
    },
        {
            provide: Window,
            useValue: window,
        }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
