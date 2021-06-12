import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './auth/guard/auth.guard';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {initializeKeycloak} from './auth/init/keycloak-init.factory';
import {ConfigInitService} from './auth/init/config-init.service';
import { DatasetComponent } from './dataset/dataset.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        WelcomeComponent,
        DatasetComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        KeycloakAngularModule,
    ],
    providers: [HttpClientModule, AuthGuard, ConfigInitService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService, ConfigInitService],
        }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
