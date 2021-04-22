import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public isLoggedIn = false;
    public mqtt;
    public notification;

    constructor(private service: AppService) {
    }

    ngOnInit(): void {
        this.isLoggedIn = this.service.checkCredentials();
        const i = window.location.href.indexOf('code');
        if (!this.isLoggedIn && i !== -1) {
            this.service.retrieveToken(window.location.href.substring(i + 5));
        }

    }

    login(): void {
        console.log(this.service);
        window.location.href = 'http://localhost:8083/auth/realms/baeldung/protocol/openid-connect/auth?response_type=code&&scope=write%20read&client_id=' +
            this.service.clientId + '&redirect_uri=' + this.service.redirectUri;
    }

    logout(): void {
        this.service.logout();
    }
}



