import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
    }
    login(): void {
        window.location.href = 'http://localhost:8083/auth/realms/baeldung/protocol/openid-connect/auth?response_type=code&&scope=write%20read&client_id=' +
            this.authService.clientId + '&redirect_uri=' + this.authService.redirectUri;
    }

}
