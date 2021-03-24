import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public isLoggedIn = false;
    public user = null;
    public mqtt = null;

    constructor(
        private service: AppService) {
    }

    ngOnInit(): void {
        this.isLoggedIn = this.service.checkCredentials();
        const i = window.location.href.indexOf('code');
        if (!this.isLoggedIn && i !== -1) {
            this.service.retrieveToken(window.location.href.substring(i + 5));
        }
        this.service.getResource('http://localhost:8080/api-v1/user')
            .subscribe(r => this.user = r);

        this.service.getResource('http://localhost:8080/api-v1/mqtt')
            .subscribe(r => this.mqtt = r);
    }

    login(): void {
        window.location.href = 'http://localhost:8083/auth/realms/baeldung/protocol/openid-connect/auth?response_type=code&&scope=write%20read&client_id=' +
            this.service.clientId + '&redirect_uri=' + this.service.redirectUri;
    }

    logout(): void {
        this.service.logout();
    }
}



