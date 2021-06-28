import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './auth/guard/auth.guard';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {initializeKeycloak} from './auth/init/keycloak-init.factory';
import {ConfigInitService} from './auth/init/config-init.service';
import {DatasetComponent} from './dataset/dataset.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { NotificationComponent } from './notification/notification.component';
import { IntegrationComponent } from './integration/integration.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DatasetComponent,
        SidebarComponent,
        NavbarComponent,
        NotificationComponent,
        IntegrationComponent,
        ProfileComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        KeycloakAngularModule,
        BrowserAnimationsModule,
        MatIconModule,
        FontAwesomeModule
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
